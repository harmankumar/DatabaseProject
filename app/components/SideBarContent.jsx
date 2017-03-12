var React = require("react");

var activeComponent = require("react-router-active-component");

var Link = activeComponent("li");

var Sidebar = require('react-sidebar').default;

module.exports = React.createClass({
    getInitialState() {
        return {sidebarOpen: false, sidebarDocked: false};
    },

    onSetSidebarOpen: function(open) {
        this.setState({sidebarOpen: open});
    },

    componentWillMount: function() {
        var mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, sidebarDocked: mql.matches});
    },

    componentWillUnmount: function() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    },

    mediaQueryChanged: function() {
        this.setState({sidebarDocked: this.state.mql.matches});
    },

    SideBarContent: function(){

        return(
            <div>
                <br/>
                <br/>
                <br/>
                <Link to="/profile/create">Create Event</Link>
                <Link to="/profile/update">Update Event</Link>
            </div>

        )
    },

    render: function () {
        var sidebarContent = this.SideBarContent();
        return(
            <div>

                <Sidebar sidebar={sidebarContent}
                         open={this.state.sidebarOpen}
                         docked={this.state.sidebarDocked}
                         onSetOpen={this.onSetSidebarOpen}>
                </Sidebar>
            </div>

        )
    }
});