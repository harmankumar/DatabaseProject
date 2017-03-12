var React = require("react");

var actions = require("../actions/sessionActions");

module.exports = React.createClass({
    getInitialState: function () {
        return {
            id: "",
            name: ""
        }
    },
    login: function (e) {
        e.preventDefault();
        actions.login({user: this.state});
        this.setState(this.getInitialState());
    },
    handleInputChange:function(e){
        e.preventDefault();
        var name = e.target.id;
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
    },
    render: function () {
        return(
            <form className="form" onSubmit={this.login}>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4">
                        <input required type="text" className="form-control" id="id" placeholder="Enter ID" value={this.state.id} onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4">
                        <input required type="text" className="form-control" id="name" placeholder="Enter Name" value={this.state.name} onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-md-offset-5 col-sm-2 col-sm-offset-5">
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>
                </div>
            </form>
        )
    }
});