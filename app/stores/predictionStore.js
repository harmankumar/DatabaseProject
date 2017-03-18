/**
 * Created by Nikhil on 27/12/16.
 */
var dispatcher = require("../dispatcher");
var predictionService = require("../services/predictionServices");

function PredictionStore() {
    var listeners = [];

    function onChange(listener) {
        //getPredictions(listener);
        listeners.push(listener);
    }

    function getPredictions(cb){
        predictionService.getPredictions().then(function (res) {
            cb(res);
        });
    }

    function changeFilter(filter) {
        predictionService.changeFilter(filter).then(function (res) {
            listeners.forEach(function (listener) {
                listener(res);
            });
        });
    }

    function addPrediction(prediction) {
        predictionService.addPrediction(prediction)(function (res, status, err) {
            console.log(res);
            if (status === "error") {
                alert("Error: Character already exists!");
            }
            triggerListeners();
        });
    }

    function deletePrediction(prediction) {
        predictionService.deletePrediction(prediction).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function getAvgPopularity(filter) {
        predictionService.getAvgPopularity(filter).then(function (res) {
            alert("Average Popularity of Selected Group: " + res[0].avg);
        });
    }

    function getAvgPrediction(filter) {
        predictionService.getAvgPrediction(filter).then(function (res) {
            alert("Average Survival Chance of Selected Group: " + res[0].avg);
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
                case "changeFilter":
                    changeFilter(payload.filter);
                    break;
                case "addPrediction":
                    addPrediction(payload.prediction);
                    break;
                case "deletePrediction":
                    deletePrediction(payload.prediction);
                    break;
                case "getAvgPopularity":
                    getAvgPopularity(payload.filter);
                    break;
                case "getAvgPrediction":
                    getAvgPrediction(payload.filter);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = PredictionStore();