var React = require("react");

var EventDelete = require("./EventDelete.jsx");

module.exports = React.createClass({
    render: function () {
        var session = this.props.session;
        return(
            <div className="container">
                {
                    this.props.events.map(function (event, index) {
                        return(
                            <EventDelete session={session} event={event} key={"event"+index} id={"event"+index}/>
                        )
                    })
                }
            </div>
        )
    }
});