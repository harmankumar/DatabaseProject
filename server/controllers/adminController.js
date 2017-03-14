/**
 * Created by Nikhil on 08/01/17.
 */
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var User = require("../data/user");

module.exports = function requireRole(role) {
    return function(req, res, next) {
        var session = req.body.session;
        if (!session)
            return res.status(403).send('403 Forbidden');
        var creds = session.creds;
        var secretKey = "~~Nikhil%Was%Here~~";
        if (!creds)
            return res.status(403).send('403 Forbidden');
        var id = creds.id;
        var apiKey = creds.apiKey;
        if (!id || !apiKey)
            return res.status(403).send('403 Forbidden');
        else if (!bcrypt.compareSync(id + secretKey, apiKey))
            return res.status(403).send('403 Forbidden');
        else {
            User.findOne({id: id}, function (err, user) {
                if (err)
                    return res.status(503).send('503 Gateway Timeout');
                else if (!user)
                    return res.status(403).send('403 Forbidden');
                else if (!(user.role.startsWith(role)))
                    return res.status(403).send('403 Forbidden');
                else
                    next();
            });
        }
    }
};
