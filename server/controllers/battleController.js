/**
 * Created by Nikhil on 26/12/16.
 */
var pg = require("pg");
var _ = require("underscore");

var conString = "postgres://postgres@localhost:5432/gotdb";

function getBattles(req, res) {
    pg.connect(conString, function (err, client, done) {
        if (err)
            res.send(err);
        client.query("SELECT * FROM battles", [], function (err, result) {
            done();
            if (err)
                res.send(err);
            res.json(result.rows);
        })
    })
}

function addBattle(req, res) {
    var event = new Battle(_.extend({}, req.body));
    event.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(event);
    });
}

function deleteBattle(req, res) {
    var id = req.body.event._id;
    Battle.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err);
        else
            res.json(removed);
    });
}

module.exports = {
    getBattles: getBattles,
    addBattle: addBattle,
    deleteBattle: deleteBattle
};