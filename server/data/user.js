var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    id: String,
    name: String,
    role: String
});

module.exports = mongoose.model("user", userSchema);