/**
 * Created by Nikhil on 27/12/16.
 */
var dispatcher = require("../dispatcher");
var eventService = require("../services/eventServices");

function EventStore() {
    var listeners = [];

    function onChange(listener) {
        getEvents(listener);
        listeners.push(listener);
    }

    function getEvents(cb){
        eventService.getEvents().then(function (res) {
            cb(res);
        });
    }

    function addEvent(school) {
        eventService.addEvent(school).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function deleteEvent(school) {
        eventService.deleteEvent(school).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function triggerListeners() {
        getEvents(function (res) {
            listeners.forEach(function (listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "event") {
            switch (split[1]) {
                case "addEvent":
                    addEvent(payload.event);
                    break;
                case "deleteEvent":
                    deleteEvent(payload.event);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = EventStore();