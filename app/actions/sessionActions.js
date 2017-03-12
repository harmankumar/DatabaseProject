/**
 * Created by Nikhil on 28/12/16.
 */
var dispatcher = require("../dispatcher");

module.exports = {
    login:function(session){
        dispatcher.dispatch({
            session:session,
            type:"session:login"
        });
    },
    logout:function(event){
        dispatcher.dispatch({
            type:"session:logout"
        });
    }
};