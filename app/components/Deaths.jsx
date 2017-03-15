var React = require("react");

var DeathInfo = require("./DeathInfo.jsx");

module.exports = React.createClass({
    render: function () {
        if (!this.props.session)
            content = <p>Please login to view deaths!</p>;
        else
            content = this.props.deaths.map(function (death, index) {
                return(
                    <DeathInfo death={death}/>
                )
            });
        return(
            <div className="container">
                {content}
            </div>
        )
    }
});