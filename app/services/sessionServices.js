/**
 * Created by Nikhil on 28/12/16.
 */
var $ = require("jquery");
var resourceUrl = "http://localhost:7777/api/login";

module.exports = {
    login: function (session) {
        return function (resolve) {
            $.ajax({
                url: resourceUrl,
                data: JSON.stringify(session),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: resolve
            });
        };
    }
};