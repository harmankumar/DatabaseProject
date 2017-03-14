var React = require("react");
var activeComponent = require("react-router-active-component");

var Link = activeComponent("li");

module.exports = React.createClass({
    render: function () {
        return(
            <div>
                <div id="navbar" className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Game of Thrones Master Database</a>
                        </div>
                    </div>
                </div>
                <div id="navbar" className="navbar navbar-default navbar-fixed-top navbar-lower">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav">
                            <Link to="/profile">Profile</Link>
                            <Link to="/predictions">Predictions</Link>
                            <Link to="/deaths">Deaths</Link>
                            <Link to="/battles">Battles</Link>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});