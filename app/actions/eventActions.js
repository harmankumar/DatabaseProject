/**
 * Created by Nikhil on 26/12/16.
 */
var dispatcher = require("../dispatcher");

module.exports = {
    addEvent:function(event){
        dispatcher.dispatch({
            event:event,
            type:"event:addEvent"
        });
    },
    deleteEvent:function(event){
        dispatcher.dispatch({
            event:event,
            type:"event:deleteEvent"
        });
    }
};