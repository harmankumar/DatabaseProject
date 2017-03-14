var React = require("react");

var actions = require("../actions/sessionActions");
var crypto = require("crypto");
var _ = require("underscore");

module.exports = React.createClass({
    getInitialState: function () {
        return {
            id: "",
            name: "",
            email: "",
            password: "",
            cpassword: "",
        }
    },
    validate: function () {
        var form = this.state;
        if (!form.id || !form.name || !form.email || !form.password || !form.cpassword) {
            alert("Please fill all field values!");
            return false;
        }
        var atpos = form.email.indexOf("@");
        var dotpos = form.email.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos+2 || dotpos+2 >= form.email.length) {
            alert("Please fill a valid Email address!");
            return false;
        }
        if (form.password !== form.cpassword) {
            alert("Passwords don't match!");
            return false;
        }
        return true;
    },
    register: function (e) {
        e.preventDefault();
        if (!this.validate())
            return;
        this.state.password = crypto.createHash('md5').update(this.state.password).digest('hex');
        actions.register({user: _.omit(this.state, "cpassword")});
        this.setState(this.getInitialState());
    },
    handleInputChange: function(e){
        e.preventDefault();
        var name = e.target.id;
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
    },
    render: function () {
        return(
            <form className="form" onSubmit={this.register}>
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
                    <div className="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4">
                        <input required type="text" className="form-control" id="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4">
                        <input required type="password" className="form-control" id="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4">
                        <input required type="password" className="form-control" id="cpassword" placeholder="Confirm Password" value={this.state.cpassword} onChange={this.handleInputChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-md-offset-5 col-sm-2 col-sm-offset-5">
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                    </div>
                </div>
            </form>
        )
    }
});