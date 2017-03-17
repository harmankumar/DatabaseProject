/**
 * Created by Nikhil on 26/12/16.
 */
var pg = require("pg");
var _ = require("underscore");

var conString = "postgres://postgres@localhost:5432/gotdb";

function getDeaths(req, res) {
    pg.connect(conString, function (err, client, done) {
        if (err)
            res.send(err);
        client.query("SELECT * FROM deaths", [], function (err, result) {
            done();
            if (err)
                res.send(err);
            res.json(result.rows);
        })
    })
}

function filterQuery(filter) {
    var query = "";
    query += "WHERE position('" + filter.name + "' in deaths.name) > 0 ";
    if (filter.house) query += "AND position('" + filter.house + "' in allegiances) > 0 ";
    if (filter.gender) query += "AND predictions.gender = '" + filter.gender + "' ";
    if (filter.noble != -1) query += "AND nobility = " + filter.noble + " ";
    if (filter.book != -1) query += "AND bookofdeath = " + filter.book + " ";
    query += "AND deathyear IS NOT NULL ";
    return query;
}

function filterQuery2(filter) {
    var query = "";
    query += "WHERE position('" + filter.name + "' in name) > 0 ";
    if (filter.house) query += "AND position('" + filter.house + "' in allegiances) > 0 ";
    if (filter.gender) query += "AND gender = '" + filter.gender + "' ";
    if (filter.noble != -1) query += "AND nobility = " + filter.noble + " ";
    if (filter.book != -1) query += "AND bookofdeath = " + filter.book + " ";
    query += "AND deathyear IS NOT NULL ";
    return query;
}

function changeFilter(req, res) {
    var filter = req.body;
    var query = "SELECT * FROM deaths, predictions ";
    query += filterQuery(filter);
    query += "AND deaths.name = predictions.name ";
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

function getBloodyBook(req, res) {
    var filter = req.body;
    var query = "SELECT bookofdeath FROM deaths ";
    query += filterQuery2(filter);
    query += "GROUP BY bookofdeath HAVING COUNT(*) = (";
    query += "SELECT MAX(deathcount) FROM (";
    query += "SELECT COUNT(*) AS deathcount FROM deaths ";
    query += filterQuery2(filter);
    query += "GROUP BY bookofdeath) countd)";
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

function addDeath(req, res) {
    var event = new Death(_.extend({}, req.body));
    event.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(event);
    });
}

function deleteDeath(req, res) {
    var id = req.body.event._id;
    Death.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err);
        else
            res.json(removed);
    });
}

module.exports = {
    getDeaths: getDeaths,
    addDeath: addDeath,
    deleteDeath: deleteDeath,
    changeFilter: changeFilter,
    getBloodyBook: getBloodyBook
};