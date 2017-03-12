var React = require("react");

var EventInfo = require("./EventInfo.jsx");

module.exports = React.createClass({
    render: function () {
        return(
            <div className="container">
            {
                 this.props.events.map(function (event, index) {
                     return(
                        <EventInfo event={event}/>
                     )
                 })
             }
            </div>
        )
    }
});