/**
 * Created by Nikhil on 26/12/16.
 */
var mongoose = require("mongoose");
var Event = require("../data/event");
var _ = require("underscore");

function getEvents(req, res) {
    Event.find(function (err, events) {
        if (err)
            res.send(err);
        else
            res.json(events);
    });
}

function addEvent(req, res) {
    var event = new Event(_.extend({}, req.body));
    event.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(event);
    });
}

function deleteEvent(req, res) {
    var id = req.body.event._id;
    Event.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err);
        else
            res.json(removed);
    });
}

module.exports = {
    getEvents: getEvents,
    addEvent: addEvent,
    deleteEvent: deleteEvent
};