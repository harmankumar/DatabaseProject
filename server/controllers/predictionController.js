/**
 * Created by Nikhil on 26/12/16.
 */
var pg = require("pg");
var _ = require("underscore");

var conString = "postgres://postgres@localhost:5432/gotdb";

function getPredictions(req, res) {
    pg.connect(conString, function (err, client, done) {
        if (err)
            res.send(err);
        client.query("SELECT * FROM predictions", [], function (err, result) {
            done();
            if (err)
                res.send(err);
            res.json(result.rows);
        })
    })
}

function addPrediction(req, res) {
    var event = new Prediction(_.extend({}, req.body));
    event.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(event);
    });
}

function deletePrediction(req, res) {
    var id = req.body.event._id;
    Prediction.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err);
        else
            res.json(removed);
    });
}

module.exports = {
    getPredictions: getPredictions,
    addPrediction: addPrediction,
    deletePrediction: deletePrediction
};