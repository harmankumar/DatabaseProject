var React = require("react");

var DeathInfo = require("./DeathInfo.jsx");

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