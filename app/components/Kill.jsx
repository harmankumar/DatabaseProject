var React = require("react");

var actions = require("../actions/deathActions");

var houses = ["House Stark", "House Targaryen", "House Greyjoy", "House Baratheon", "House Lannister", "House Frey", "House Martell", "House Tyrell", "House Tully", "House Arryn"];

module.exports = React.createClass({
    getInitialState: function () {
        return{
            name: "",
            allegiances: "",
            gender: "",
            deathyear: "",
            bookofdeath: "",
            deathchapter: "",
            bookintrochapter: "",
        }
    },
    killCharacter:function(e){
        e.preventDefault();
        actions.addDeath(this.state);
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
        var rows = [];
        for (i = 0; i < houses.length; i++)
            rows.push(<option value={houses[i]}>{houses[i]}</option>);

        if (this.props.session.user.role != "admin")
            content = <p>You need to be an admin to access this!</p>;
        else
            content =
                <div className="container-fluid">
                    <form className="form" onSubmit={this.createCharacter}>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <input required type="text" className="form-control" id="name" placeholder="Name of Character" value={this.state.name} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <select required className="form-control" id="allegiances" value={this.state.allegiances} onChange={this.handleInputChange}>
                                    <option selected disabled>Select House</option>
                                    {rows}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div required className="col-md-2 col-md-offset-3">
                                <select required className="form-control" id="gender" value={this.state.gender} onChange={this.handleInputChange}>
                                    <option selected disabled>Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div required className="col-md-2">
                                <input required className="form-control" type="text" id="deathyear" placeholder="Death Year" value={this.state.deathyear} onChange={this.handleInputChange}/>
                            </div>
                            <div required className="col-md-2">
                                <input required className="form-control" type="text" id="bookofdeath" placeholder="Book of Death" value={this.state.bookofdeath} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div required className="col-md-2 col-md-offset-4">
                                <input required className="form-control" type="text" id="deathchapter" placeholder="Death Chapter" value={this.state.deathchapter} onChange={this.handleInputChange}/>
                            </div>
                            <div required className="col-md-2">
                                <input required className="form-control" type="text" id="bookintrochapter" placeholder="Book Intro Chapter" value={this.state.bookintrochapter} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2 col-md-offset-5">
                                <button type="submit" className="btn btn-primary btn-block" onClick={this.killCharacter}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>;
        return(
            <div className="container">
                {content}
            </div>
        )
    }
});