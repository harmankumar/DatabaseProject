/**
 * Created by Nikhil on 27/12/16.
 */
var dispatcher = require("../dispatcher");
var deathService = require("../services/deathServices");

function DeathStore() {
    var listeners = [];

    function onChange(listener) {
        getDeaths(listener);
        listeners.push(listener);
    }

    function getDeaths(cb){
        deathService.getDeaths().then(function (res) {
            cb(res);
        });
    }

    function addDeath(death) {
        deathService.addDeath(death).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function deleteDeath(death) {
        deathService.deleteDeath(death).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function triggerListeners() {
        getDeaths(function (res) {
            listeners.forEach(function (listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "death") {
            switch (split[1]) {
                case "addDeath":
                    addDeath(payload.event);
                    break;
                case "deleteDeath":
                    deleteDeath(payload.event);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = DeathStore();