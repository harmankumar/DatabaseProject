var $ = require("jquery");
var promise = require("es6-promise");
var resourceUrl = "http://localhost:7777/api/deaths";

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
    getBloodyBook: function (filter) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl + "/bloodybook",
                data: JSON.stringify(filter),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    },
    addDeath: function (death) {
        return function (resolve) {
            $.ajax({
                url: "http://localhost:7777/api/kill",
                data: JSON.stringify(death),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: resolve
            });
        };
    },
    getDeaths: function () {
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
    deleteDeath: function (death) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl + "/delete",
                data: JSON.stringify(death),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    }
};