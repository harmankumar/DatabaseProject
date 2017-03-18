var $ = require("jquery");
var promise = require("es6-promise");
var resourceUrl = "http://localhost:7777/api/predictions";

module.exports = {
    changeFilter: function (filter) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl + "/filter",
                data: JSON.stringify(filter),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    },
    getAvgPopularity: function (filter) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl + "/avgpop",
                data: JSON.stringify(filter),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    },
    getAvgPrediction: function (filter) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl + "/avgpred",
                data: JSON.stringify(filter),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    },
    addPrediction: function (prediction) {
        return function (resolve) {
            $.ajax({
                url: "http://localhost:7777/api/create",
                data: JSON.stringify(prediction),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: resolve
            });
        };
    },
    getPredictions: function () {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl,
                method: "GET",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
    },
    deletePrediction: function (prediction) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl + "/delete",
                data: JSON.stringify(prediction),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    }
};