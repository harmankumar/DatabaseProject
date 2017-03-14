var React = require("react");

module.exports = React.createClass({
    render: function () {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title pull-left">{this.props.death.name}</div>
                    <div className="pull-right">{this.props.death.club}</div>
                    <div className="clearfix"></div>
                </div>
                <div className="panel-body">{this.props.death.desc}</div>
                <div className="panel-footer">
                    <div className="pull-left">{this.props.death.date}</div>
                    <div className="pull-right">{this.props.death.venue}</div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
});