var React = require("react");
var ReactDOM = require("react-dom");
var Route = require("react-router").Route;
var Router = require("react-router").Router;
var IndexRedirect = require("react-router").IndexRedirect;
var browserHistory = require("react-router").browserHistory;

var App = require("./components/App.jsx");
var Predictions = require("./components/Predictions.jsx");
var Deaths = require("./components/Deaths.jsx");
var Battles = require("./components/Battles.jsx");
var Profile = require("./components/Profile.jsx");
//var CreateEvent = require("./components/CreateEvent.jsx");
//var UpdateEvent = require("./components/UpdateEvent.jsx");

var predictionStore = require("./stores/predictionStore");
var _predictions = [];
var getPredictionsCallback = function(predictions){
    _predictions = predictions;
    render();
};
predictionStore.onChange(getPredictionsCallback);

var deathStore = require("./stores/deathStore");
var _deaths = [];
var getDeathsCallback = function(deaths){
    _deaths = deaths;
    render();
};
deathStore.onChange(getDeathsCallback);

var battleStore = require("./stores/battleStore");
var _battles = [];
var getBattlesCallback = function(battles){
    _battles = battles;
    render();
};
battleStore.onChange(getBattlesCallback);


var sessionStore = require("./stores/sessionStore");
var _session = null;
var getLoginStatusCallback = function(response){
    console.log(response);
    if (response.logout || (response.status > 200 && response.status < 500)) {
        localStorage.removeItem("brca_ems_id");
        localStorage.removeItem("brca_ems_api_key");
        _session = null;
    }
    else if (response.status === 200) {
        localStorage.brca_ems_id = response.body.session.creds.id;
        localStorage.brca_ems_api_key = response.body.session.creds.apiKey;
        _session = response.body.session;
    }
    render();
};
var id = localStorage.brca_ems_id;
var apiKey = localStorage.brca_ems_api_key;
if (id && apiKey)
    sessionStore.onChange(getLoginStatusCallback, {creds: {id: id, apiKey: apiKey}});
else
    sessionStore.onChange(getLoginStatusCallback);


function render(){
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="profile"/>
                <Route path="profile" component={() => <Profile session={_session}/>}/>
                <Route path="predictions" component={() => <Predictions predictions={_predictions}/>}/>
                <Route path="deaths" component={() => <Deaths deaths={_deaths}/>}/>
                <Route path="battles" component={() => <Battles battles={_battles}/>}/>
            </Route>
        </Router>, document.getElementById("main"));
}