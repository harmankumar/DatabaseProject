var React = require("react");
var actions = require("../actions/predictionActions");
global.jQuery = require("jquery");
require("bootstrap");

module.exports = React.createClass({
    deleteEvent: function(e){
        e.preventDefault();
        actions.deleteEvent({
            session: this.props.session,
            event: this.props.event
        });
    },
    render: function () {
        return(
            <div className="panel-group">
                <div className="panel panel-default">
                    <div className="panel-heading" role="button" data-target={"#"+this.props.id} data-toggle="collapse">
                        <div className="panel-title pull-left">{this.props.event.name}</div>
                        <span className="pull-right text-uppercase delete-button" onClick={this.deleteEvent}>&times;</span>
                        <div className="clearfix"></div>
                    </div>
                    <div id={this.props.id} className="collapse">
                        <div className="panel-body">{this.props.event.desc}</div>
                        <div className="panel-footer">
                            <div className="pull-left">{this.props.event.date}</div>
                            <div className="pull-right">{this.props.event.venue}</div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});