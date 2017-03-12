var mongoose = require("mongoose");
var eventSchema = mongoose.Schema({
    name: String,
    club: String,
    desc: String,
    date: String,
    venue: String
});

module.exports = mongoose.model("event", eventSchema);