var React = require("react");

var BattleInfo = require("./BattleInfo.jsx");

module.exports = React.createClass({
    render: function () {
        return(
            <div className="container">
            {
                 this.props.battles.map(function (battle, index) {
                     return(
                        <BattleInfo battle={battle}/>
                     )
                 })
             }
            </div>
        )
    }
});