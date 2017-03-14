/**
 * Created by Nikhil on 27/12/16.
 */
var dispatcher = require("../dispatcher");
var predictionService = require("../services/predictionServices");

function PredictionStore() {
    var listeners = [];

    function onChange(listener) {
        getPredictions(listener);
        listeners.push(listener);
    }

    function getPredictions(cb){
        predictionService.getPredictions().then(function (res) {
            cb(res);
        });
    }

    function addPrediction(prediction) {
        predictionService.addPrediction(prediction).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function deletePrediction(prediction) {
        predictionService.deletePrediction(prediction).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function triggerListeners() {
        getPredictions(function (res) {
            listeners.forEach(function (listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "prediction") {
            switch (split[1]) {
                case "addPrediction":
                    addPrediction(payload.event);
                    break;
                case "deletePrediction":
                    deletePrediction(payload.event);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = PredictionStore();