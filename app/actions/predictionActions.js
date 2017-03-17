/**
 * Created by Nikhil on 26/12/16.
 */
var dispatcher = require("../dispatcher");

module.exports = {
    getAvgPopularity: function (filter) {
        dispatcher.dispatch({
            filter:filter,
            type:"prediction:getAvgPopularity"
        });
    },
    getAvgPrediction: function (filter) {
        dispatcher.dispatch({
            filter:filter,
            type:"prediction:getAvgPrediction"
        });
    },
    changeFilter:function(filter){
        dispatcher.dispatch({
            filter:filter,
            type:"prediction:changeFilter"
        });
    },
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