var React = require("react");

var Login = require("./Login.jsx");
var Logout = require("./Logout.jsx");

var SideBarContent = require("./SideBarContent.jsx");

module.exports = React.createClass({

    getName: function () {
        return (this.props.session)? this.props.session.user.name : "Unknown User";
    },

    render: function () {
        if (!this.props.session)
             content = <Login/>;
        else
             content = <Logout/>;
        console.log(this.props);
        return(
            <div className="container-fluid">
                <b>
                    <h1>Hey, {this.getName()}!</h1>
                </b>
                {content}
            </div>
        )
    }
});