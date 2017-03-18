var React = require("react");

var actions = require("../actions/predictionActions");

var houses = ["House Stark", "House Targaryen", "House Greyjoy", "House Baratheon", "House Lannister", "House Frey", "House Martell", "House Tyrell", "House Tully", "House Arryn"];

module.exports = React.createClass({
    getInitialState: function () {
        return{
            name: "",
            house: "",
            title: "",
            gender: "",
            plod: "",
            actual: 1,
            popularity: "",
        }
    },
    createCharacter:function(e){
        e.preventDefault();
        actions.addPrediction(this.state);
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
                            <div className="col-md-2 col-md-offset-3">
                                <input type="text" className="form-control" id="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange}/>
                            </div>
                            <div className="col-md-4">
                                <input required type="text" className="form-control" id="name" placeholder="Name of Character" value={this.state.name} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <select required className="form-control" id="house" value={this.state.house} onChange={this.handleInputChange}>
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
                                <input required className="form-control" type="text" id="plod" placeholder="Death Chance" value={this.state.plod} onChange={this.handleInputChange}/>
                            </div>
                            <div required className="col-md-2">
                                <input required className="form-control" type="text" id="popularity" placeholder="Popularity" value={this.state.popularity} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2 col-md-offset-5">
                                <button type="submit" className="btn btn-primary btn-block" onClick={this.createCharacter}>Submit</button>
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