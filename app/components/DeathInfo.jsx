var React = require("react");

module.exports = React.createClass({
    printName: function(death) {
        var name = death.name;
        if (death.allegiances)
            name += " (" + death.allegiances + ")";
        return name;
    },
    bodyData: function (value) {
        if (value) return value;
        return "Nil";
    },
    isNoble: function (nobility) {
        return (nobility)? "Yes" : "No";
    },
    render: function () {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title pull-left">{this.printName(this.props.death)}</div>
                    <div className="pull-right">Popularity (from Predictions): {this.props.death.popularity.toPrecision(3)}</div>
                    <div className="clearfix"></div>
                </div>
                <div className="panel-body">
                    <b>Gender:               </b> {this.props.death.gender}<br/>
                    <b>Noble:                </b> {this.isNoble(this.props.death.nobility)}<br/>
                    <b>Book Intro Chapter    </b> {this.bodyData(this.props.death.bookintrochapter)}<br/>
                    <b>Year of Death:        </b> {this.bodyData(this.props.death.deathyear)}<br/>
                    <b>Book of Death:        </b> {this.bodyData(this.props.death.bookofdeath)}<br/>
                    <b>Chapter of Death:     </b> {this.bodyData(this.props.death.deathchapter)}<br/>
                </div>
            </div>
        )
    }
});