/**
 * Created by Nikhil on 26/12/16.
 */
var dispatcher = require("../dispatcher");

module.exports = {
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