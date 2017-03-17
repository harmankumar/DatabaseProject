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

function houseInBattle(house, role) {
    var query = "(";
    query += "(" + role + "_1 = '" + house + "') OR ";
    query += "(" + role + "_2 = '" + house + "') OR ";
    query += "(" + role + "_3 = '" + house + "') OR ";
    query += "(" + role + "_4 = '" + house + "'))";
    return query;
}

function houseInvolved(house) {
    return "(" + houseInBattle(house, "attacker") + " OR " + houseInBattle(house, "defender") + ")";
}

function houseWinner(house) {
    var query = "(";
    query += "(" + houseInBattle(house, "attacker") + " AND " + " attacker_outcome = 'win') OR ";
    query += "(" + houseInBattle(house, "defender") + " AND " + " attacker_outcome = 'loss'))";
    return query;
}

function filterQuery(filter) {
    var query = "";
    query += "WHERE position('" + filter.name + "' in name) > 0 ";
    if (filter.house1) query += "AND " + houseInvolved(filter.house1) + " ";
    if (filter.house2) query += "AND " + houseInvolved(filter.house2) + " ";
    if (filter.winner) query += "AND " + houseWinner(filter.winner) + " ";
    if (filter.type) query += "AND battle_type = '" + filter.type + "' ";
    if (filter.region) query += "AND region = '" + filter.region + "' ";
    return query;
}

function changeFilter(req, res) {
    var filter = req.body;
    var query = "SELECT * FROM battles ";
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

function getMaxWin(req, res) {

}

function getMaxDefeat(req, res) {

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
    deleteBattle: deleteBattle,
    changeFilter: changeFilter,
    getMaxWin: getMaxWin,
    getMaxDefeat: getMaxDefeat
};