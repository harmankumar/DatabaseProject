/**
 * Created by Nikhil on 25/12/16.
 */
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");

var eventController = require("./controllers/eventController");
var sessionController = require("./controllers/sessionController");
var adminController = require("./controllers/adminController");

var app = express();
app.use('/', express.static(path.join(__dirname,"../app/dist")));
app.use('/home', express.static(path.join(__dirname,"../app/dist")));
app.use('/profile', express.static(path.join(__dirname,"../app/dist")));
app.use('/create', express.static(path.join(__dirname,"../app/dist")));
app.use('/update', express.static(path.join(__dirname,"../app/dist")));
app.use('/profile/create', express.static(path.join(__dirname,"../app/dist")));
app.use('/profile/update', express.static(path.join(__dirname,"../app/dist")));
app.use(bodyParser.json());

app.get("/api/events", eventController.getEvents);
app.post("/api/events", adminController("secy"), eventController.addEvent);
app.post("/api/events/delete", adminController("secy"), eventController.deleteEvent);

app.use("/api/login", sessionController);

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
});

mongoose.connect("mongodb://localhost/eventfinder");