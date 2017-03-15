var React = require("react");

var PredictionInfo = require("./PredictionInfo.jsx");

module.exports = React.createClass({
    render: function () {
        if (!this.props.session)
            content = <p>Please login to view predictions!</p>;
        else
            content = this.props.predictions.map(function (prediction, index) {
                return(
                    <PredictionInfo prediction={prediction}/>
                )
            });
        return(
            <div className="container">
            {content}
            </div>
        )
    }
});