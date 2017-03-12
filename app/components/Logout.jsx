var React = require("react");

var actions = require("../actions/sessionActions");

module.exports = React.createClass({
    logout: function (e) {
        e.preventDefault();
        actions.logout();
    },
    render: function () {
        return(
            <div className="row">
                <div className="col-md-2 col-md-offset-5">
                    <button onClick={this.logout} className="btn btn-primary btn-block">Logout</button>
                </div>
            </div>
        )
    }
});