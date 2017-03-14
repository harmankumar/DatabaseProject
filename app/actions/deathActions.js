/**
 * Created by Nikhil on 26/12/16.
 */
var dispatcher = require("../dispatcher");

module.exports = {
    addDeath:function(death){
        dispatcher.dispatch({
            death:death,
            type:"death:addDeath"
        });
    },
    deleteDeath:function(death){
        dispatcher.dispatch({
            death:death,
            type:"death:deleteDeath"
        });
    }
};