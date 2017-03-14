/**
 * Created by Nikhil on 27/12/16.
 */
var dispatcher = require("../dispatcher");
var battleService = require("../services/battleServices");

function BattleStore() {
    var listeners = [];

    function onChange(listener) {
        getBattles(listener);
        listeners.push(listener);
    }

    function getBattles(cb){
        battleService.getBattles().then(function (res) {
            cb(res);
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
                case "addBattle":
                    addBattle(payload.event);
                    break;
                case "deleteBattle":
                    deleteBattle(payload.event);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = BattleStore();