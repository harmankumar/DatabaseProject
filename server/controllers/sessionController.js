/**
 * Created by Nikhil on 28/12/16.
 */
var pg = require("pg");
var bcrypt = require("bcryptjs");
var _ = require("underscore");

var conString = "postgres://postgres@localhost:5432/gotdb";
var secretKey = "~~Nikhil%Was%Here~~";

function login(req, res) {
    var creds = req.body.creds;
    var user = req.body.user;
    if (creds) {
        var id = creds.id;
        var apiKey = creds.apiKey;
        if (!id || !apiKey)
            return res.status(401).send('401 Unauthorized');
        if (!bcrypt.compareSync(id + secretKey, apiKey))
            return res.status(401).send('401 Unauthorized');
        pg.connect(conString, function (err, client, done) {
            if (err)
                return res.status(503).send('503 Gateway Timeout');
            client.query("SELECT * FROM users WHERE id=$1", [id], function (err, result) {
                done();
                if (err)
                    return res.status(503).send('503 Gateway Timeout');
                if (result.rows.length != 1)
                    return res.status(401).send('401 Unauthorized');
                return res.status(200).send({session: {creds: creds, user: result.rows[0]}});
            });
        });
    }
    else if (user) {
        if (!user.id || !user.password)
            return res.status(400).send('400 Bad Request');
        pg.connect(conString, function (err, client, done) {
            if (err)
                return res.status(503).send('503 Gateway Timeout');
            client.query("SELECT * FROM users WHERE id=$1", [user.id], function (err, result) {
                done();
                if (err)
                    return res.status(503).send('503 Gateway Timeout');
                if (result.rows.length != 1)
                    return res.status(401).send('401 Unauthorized');
                if (user.password !== result.rows[0].password)
                    return res.status(401).send('401 Unauthorized');
                var salt = bcrypt.genSaltSync(10);
                var apiKey = bcrypt.hashSync(user.id + secretKey, salt);
                var creds = {id: user.id, apiKey: apiKey};
                return res.status(200).send({session: {creds: creds, user: result.rows[0]}});
            });
        });

    }
}

function register(req, res) {
    var user = req.body.user;
    if (!user || !user.id || !user.password || !user.name || !user.email)
        return res.status(400).send('400 Bad Request');
    pg.connect(conString, function (err, client, done) {
        if (err)
            return res.status(503).send('503 Gateway Timeout');
        client.query("SELECT * FROM users WHERE id=$1", [user.id], function (err, result) {
            if (err)
                return res.status(503).send('503 Gateway Timeout');
            if (result.rows.length != 0)
                return res.status(409).send('409 Conflict');
            registerUser(res, user, client, done);
        });
    });
}

function registerUser(res, user, client, done) {
    client.query(   "INSERT INTO users (id, password, name, email, role) VALUES ($1, $2, $3, $4, $5)",
                    [user.id, user.password, user.name, user.email, "user"],
                    function (err, result) {
        done();
        if (err)
            return res.status(503).send('503 Gateway Timeout');
        var salt = bcrypt.genSaltSync(10);
        var apiKey = bcrypt.hashSync(user.id + secretKey, salt);
        var creds = {id: user.id, apiKey: apiKey};
        return res.status(200).send({session: {creds: creds, user: _.extend({role: "user"}, user)}});
    });
}

module.exports = {
    login: login,
    register: register
};