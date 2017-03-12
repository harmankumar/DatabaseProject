var React = require("react");

var Navbar = require("./Navbar.jsx");

module.exports = React.createClass({
    render: function () {
        return(
            <div>
                <Navbar initPath={this.props.location.pathname}/>
                {this.props.children}
            </div>
        )
    }
});