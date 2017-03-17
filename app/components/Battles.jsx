var React = require("react");

var BattleInfo = require("./BattleInfo.jsx");

module.exports = React.createClass({
    getInitialState: function () {
        return {
            name: "",
        }
    },
    handleInputChange:function(e){
        e.preventDefault();
        var name = e.target.id;
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
        this.render();
    },
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