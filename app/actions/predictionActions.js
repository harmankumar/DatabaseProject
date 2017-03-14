/**
 * Created by Nikhil on 26/12/16.
 */
var dispatcher = require("../dispatcher");

module.exports = {
    addPrediction:function(prediction){
        dispatcher.dispatch({
            prediction:prediction,
            type:"prediction:addPrediction"
        });
    },
    deletePrediction:function(prediction){
        dispatcher.dispatch({
            prediction:prediction,
            type:"prediction:deletePrediction"
        });
    }
};