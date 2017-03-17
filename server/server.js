/**
 * Created by Nikhil on 25/12/16.
 */
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var predictionController = require("./controllers/predictionController");
var deathController = require("./controllers/deathController");
var battleController = require("./controllers/battleController");
var sessionController = require("./controllers/sessionController");
//var adminController = require("./controllers/adminController");

var app = express();
app.use('/', express.static(path.join(__dirname,"../app/dist")));
app.use('/profile', express.static(path.join(__dirname,"../app/dist")));
app.use('/predictions', express.static(path.join(__dirname,"../app/dist")));
app.use('/battles', express.static(path.join(__dirname,"../app/dist")));
app.use('/deaths', express.static(path.join(__dirname,"../app/dist")));
app.use('/create', express.static(path.join(__dirname,"../app/dist")));
app.use('/update', express.static(path.join(__dirname,"../app/dist")));
app.use('/profile/create', express.static(path.join(__dirname,"../app/dist")));
app.use('/profile/update', express.static(path.join(__dirname,"../app/dist")));
app.use(bodyParser.json());

app.get("/api/predictions", predictionController.getPredictions);
app.use("/api/predictions/filter", predictionController.changeFilter);
app.use("/api/predictions/avgpop", predictionController.getAvgPopularity);
app.use("/api/predictions/avgpred", predictionController.getAvgPrediction);

app.get("/api/deaths", deathController.getDeaths);
app.use("/api/deaths/filter", deathController.changeFilter);
app.use("/api/deaths/bloodybook", deathController.getBloodyBook);

app.get("/api/battles", battleController.getBattles);
app.use("/api/battles/filter", battleController.changeFilter);
app.use("/api/battles/maxwin", battleController.getMaxWin);
app.use("/api/battles/maxdef", battleController.getMaxDefeat);

//app.post("/api/predictions", adminController("secy"), predictionController.addEvent);
//app.post("/api/predictions/delete", adminController("secy"), predictionController.deleteEvent);

app.use("/api/login", sessionController.login);
app.use("/api/register", sessionController.register);

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
});