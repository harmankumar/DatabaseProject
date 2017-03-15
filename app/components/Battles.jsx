var React = require("react");

var BattleInfo = require("./BattleInfo.jsx");

module.exports = React.createClass({
    render: function () {
        if (!this.props.session)
            content = <p>Please login to view battles!</p>;
        else
            content = this.props.battles.map(function (battle, index) {
                return(
                    <BattleInfo battle={battle}/>
                )
            });
        return(
            <div className="container">
                {content}
            </div>
        )
    }
});