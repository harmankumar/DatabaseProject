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
        });
    });
}

function filterQuery(filter) {
    var query = "";
    query += "WHERE position('" + filter.name + "' in name) > 0 ";
    if (filter.house) query += "AND position('" + filter.house + "' in house) > 0 ";
    if (filter.gender) query += "AND gender = '" + filter.gender + "' ";
    if (filter.pred != -1) query += "AND pred = " + filter.pred + " ";
    if (filter.actual != -1) query += "AND actual = " + filter.actual + " ";
    if (filter.popular != -1) query += "AND isPopular = " + filter.popular + " ";
    if (filter.book1 != -1) query += "AND book1 = " + filter.book1 + " ";
    if (filter.book2 != -1) query += "AND book2 = " + filter.book2 + " ";
    if (filter.book3 != -1) query += "AND book3 = " + filter.book3 + " ";
    if (filter.book4 != -1) query += "AND book4 = " + filter.book4 + " ";
    if (filter.book5 != -1) query += "AND book5 = " + filter.book5 + " ";
    return query;
}

function changeFilter(req, res) {
    var filter = req.body;
    var query = "SELECT * FROM predictions ";
    query += filterQuery(filter);
    query += "ORDER BY " + filter.sort;
    console.log(query);
    pg.connect(conString, function (err, client, done) {
        if (err)
            return res.status(503).send('503 Gateway Timeout');
        client.query(query, [], function (err, result) {
            done();
            if (err) {
                console.log(err);
                return res.status(400).send('400 Bad Request');
            }
            return res.status(200).send(result.rows);
        });
    });
}

function getAvgPopularity(req, res) {
    var filter = req.body;
    var query = "SELECT AVG(popularity) FROM predictions ";
    query += filterQuery(filter);
    console.log(query);
    pg.connect(conString, function (err, client, done) {
        if (err)
            return res.status(503).send('503 Gateway Timeout');
        client.query(query, [], function (err, result) {
            done();
            if (err) {
                console.log(err);
                return res.status(400).send('400 Bad Request');
            }
            return res.status(200).send(result.rows);
        });
    });
}

function getAvgPrediction(req, res) {
    var filter = req.body;
    var query = "SELECT AVG(pred) FROM predictions ";
    query += filterQuery(filter);
    console.log(query);
    pg.connect(conString, function (err, client, done) {
        if (err)
            return res.status(503).send('503 Gateway Timeout');
        client.query(query, [], function (err, result) {
            done();
            if (err) {
                console.log(err);
                return res.status(400).send('400 Bad Request');
            }
            return res.status(200).send(result.rows);
        });
    });
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
    deletePrediction: deletePrediction,
    changeFilter: changeFilter,
    getAvgPopularity: getAvgPopularity,
    getAvgPrediction: getAvgPrediction
};