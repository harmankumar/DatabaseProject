var React = require("react");
var ReactDOM = require("react-dom");
var Route = require("react-router").Route;
var Router = require("react-router").Router;
var IndexRedirect = require("react-router").IndexRedirect;
var browserHistory = require("react-router").browserHistory;

var App = require("./components/App.jsx");
var Home = require("./components/Home.jsx");
var Profile = require("./components/Profile.jsx");
var CreateEvent = require("./components/CreateEvent.jsx");
var UpdateEvent = require("./components/UpdateEvent.jsx");

var eventStore = require("./stores/eventStore");
var _events = [];
var getEventsCallback = function(events){
    _events = events;
    render();
};
eventStore.onChange(getEventsCallback);


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
                <IndexRedirect to="home"/>
                <Route path="home" component={() => <Home events={_events}/>}/>
                <Route path="profile" component={() => <Profile session={_session}/>}/>
                <Route path="create" component={() => <CreateEvent session={_session}/>}/>
                <Route path="update" component={() => <UpdateEvent session={_session} events={_events}/>}/>
            </Route>
        </Router>, document.getElementById("main"));
}