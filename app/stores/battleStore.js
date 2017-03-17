/**
 * Created by Nikhil on 27/12/16.
 */
var dispatcher = require("../dispatcher");
var battleService = require("../services/battleServices");

function BattleStore() {
    var listeners = [];

    function onChange(listener) {
        //getBattles(listener);
        listeners.push(listener);
    }

    function getBattles(cb){
        battleService.getBattles().then(function (res) {
            cb(res);
        });
    }

    function changeFilter(filter) {
        battleService.changeFilter(filter).then(function (res) {
            listeners.forEach(function (listener) {
                listener(res);
            });
        });
    }

    function addBattle(battle) {
        battleService.addBattle(battle).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function deleteBattle(battle) {
        battleService.deleteBattle(battle).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function getMaxWin(filter) {
        battleService.getMaxWin(filter).then(function (res) {
            alert("King with Maximum Wins on Selected Group: " + res[0].max);
        });
    }

    function getMaxDefeat(filter) {
        battleService.getMaxDefeat(filter).then(function (res) {
            alert("King with Maximum Defeats on Selected Group: " + res[0].max);
        });
    }

    function triggerListeners() {
        getBattles(function (res) {
            listeners.forEach(function (listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "battle") {
            switch (split[1]) {
                case "changeFilter":
                    changeFilter(payload.filter);
                    break;
                case "addBattle":
                    addBattle(payload.event);
                    break;
                case "deleteBattle":
                    deleteBattle(payload.event);
                    break;
                case "getMaxWin":
                    getMaxWin(payload.filter);
                    break;
                case "getAvgPrediction":
                    getMaxDefeat(payload.filter);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = BattleStore();