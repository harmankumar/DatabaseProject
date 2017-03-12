/**
 * Created by Nikhil on 28/12/16.
 */
var dispatcher = require("../dispatcher");
var sessionService = require("../services/sessionServices");

function SessionStore() {
    var listeners = [];

    function onChange(listener, session) {
        if (session)
            login(session);
        listeners.push(listener);
    }

    function login(session) {
        sessionService.login(session)(function (res, status, err) {
            if (status === "error")
                triggerListeners({status: res.status});
            else
                triggerListeners({body: res, status: 200});
        });
    }

    function logout() {
        console.log("logged out");
        triggerListeners({logout: true});
    }

    function triggerListeners(res) {
        listeners.forEach(function (listener) {
            listener(res);
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "session") {
            switch (split[1]) {
                case "login":
                    login(payload.session);
                    break;
                case "logout":
                    logout();
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = SessionStore();