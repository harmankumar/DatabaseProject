/**
 * Created by Nikhil on 27/12/16.
 */
var dispatcher = require("../dispatcher");
var deathService = require("../services/deathServices");

function DeathStore() {
    var listeners = [];

    function onChange(listener) {
        //getDeaths(listener);
        listeners.push(listener);
    }

    function getDeaths(cb){
        deathService.getDeaths().then(function (res) {
            cb(res);
        });
    }

    function changeFilter(filter) {
        deathService.changeFilter(filter).then(function (res) {
            listeners.forEach(function (listener) {
                listener(res);
            });
        });
    }

    function addDeath(death) {
        deathService.addDeath(death)(function (res, status, err) {
            console.log(res);
            if (status === "error") {
                alert("Error: Character not present in Predictions!");
            }
            triggerListeners();
        });
    }

    function deleteDeath(death) {
        deathService.deleteDeath(death).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function getBloodyBook(filter) {
        deathService.getBloodyBook(filter).then(function (res) {
            alert("Most Deadly Book for Selected Group: " + res[0].bookofdeath);
        });
    }

    function triggerListeners() {
        getDeaths(function (res) {
            listeners.forEach(function (listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "death") {
            switch (split[1]) {
                case "changeFilter":
                    changeFilter(payload.filter);
                    break;
                case "addDeath":
                    addDeath(payload.death);
                    break;
                case "deleteDeath":
                    deleteDeath(payload.death);
                    break;
                case "getBloodyBook":
                    getBloodyBook(payload.filter);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = DeathStore();