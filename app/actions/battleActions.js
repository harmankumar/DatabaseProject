/**
 * Created by Nikhil on 26/12/16.
 */
var dispatcher = require("../dispatcher");

module.exports = {
    getAvgPopularity: function (filter) {
        dispatcher.dispatch({
            filter:filter,
            type:"battle:getMaxWin"
        });
    },
    getAvgPrediction: function (filter) {
        dispatcher.dispatch({
            filter:filter,
            type:"battle:getMaxDefeat"
        });
    },
    changeFilter:function(filter){
        dispatcher.dispatch({
            filter:filter,
            type:"battle:changeFilter"
        });
    },
    addBattle:function(battle){
        dispatcher.dispatch({
            battle:battle,
            type:"battle:addBattle"
        });
    },
    deleteBattle:function(battle){
        dispatcher.dispatch({
            battle:battle,
            type:"battle:deleteBattle"
        });
    }
};