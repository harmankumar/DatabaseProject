var React = require("react");

var PredictionInfo = require("./PredictionInfo.jsx");

module.exports = React.createClass({
    render: function () {
        return(
            <div className="container">
            {
                 this.props.predictions.map(function (prediction, index) {
                     return(
                        <PredictionInfo prediction={prediction}/>
                     )
                 })
             }
            </div>
        )
    }
});