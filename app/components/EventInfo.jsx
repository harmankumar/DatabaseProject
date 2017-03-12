var React = require("react");

module.exports = React.createClass({
    render: function () {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title pull-left">{this.props.event.name}</div>
                    <div className="pull-right">{this.props.event.club}</div>
                    <div className="clearfix"></div>
                </div>
                <div className="panel-body">{this.props.event.desc}</div>
                <div className="panel-footer">
                    <div className="pull-left">{this.props.event.date}</div>
                    <div className="pull-right">{this.props.event.venue}</div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
});