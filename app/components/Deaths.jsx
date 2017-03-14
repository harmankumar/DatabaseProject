var React = require("react");

var DeathInfo = require("./DeathInfo.jsx");

module.exports = React.createClass({
    render: function () {
        return(
            <div className="container">
            {
                 this.props.deaths.map(function (death, index) {
                     return(
                        <DeathInfo death={death}/>
                     )
                 })
             }
            </div>
        )
    }
});