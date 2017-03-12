/**
 * Created by Nikhil on 28/12/16.
 */
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var User = require("../data/user");
var _ = require("underscore");

var router = require("express").Router();
router.route("/").post(login);

function login(req, res) {
    var secretKey = "~~Nikhil%Was%Here~~";
    var creds = req.body.creds;
    var user = req.body.user;
    if (creds) {
        var id = creds.id;
        var apiKey = creds.apiKey;
        if (!id || !apiKey)
            return res.status(401).send('401 Unauthorized');
        if (!bcrypt.compareSync(id + secretKey, apiKey))
            return res.status(401).send('401 Unauthorized');
        User.findOne({id: id}, function (err, user) {
            if (err)
                return res.status(503).send('503 Gateway Timeout');
            if (!user)
                return res.status(401).send('401 Unauthorized');
            return res.status(200).send({session: {creds: creds, user: user}});
        });
    }
    else if (user) {
        if (!user.id || !user.name)
            return res.status(400).send('400 Bad Request');
        User.findOne({id: user.id}, function (err, foundUser) {
            if (err)
                return res.status(503).send('503 Gateway Timeout');
            var salt = bcrypt.genSaltSync(10);
            var apiKey = bcrypt.hashSync(user.id + secretKey, salt);
            var creds = {id: user.id, apiKey: apiKey};
            if (foundUser)
                return res.status(200).send({session: {creds: creds, user: foundUser}});
            var newUser = new User(user);
            newUser.save(function (err) {
                if (err)
                    return res.status(503).send('503 Gateway Timeout');
                return res.status(200).send({session: {creds: creds, user: user}});
            });
        });
    }
    else
        return res.status(400).send('400 Bad Request');
}

module.exports = router;