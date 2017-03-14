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
    register:function(session){
        dispatcher.dispatch({
            session:session,
            type:"session:register"
        });
    },
    logout:function(){
        dispatcher.dispatch({
            type:"session:logout"
        });
    }
};