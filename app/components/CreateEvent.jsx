var React = require("react");

var actions = require("../actions/eventActions");

var clubs = [
    {name: "Dramatics", value: "drama"},
    {name: "Dance", value: "dance"},
    {name: "Debating", value: "debating"},
    {name: "Literary", value: "lit"},
    {name: "Quizzing", value: "quiz"},
    {name: "Music", value: "music"},
    {name: "PFC", value: "pfc"},
    {name: "Fine Arts", value: "facc"},
    {name: "Hindi Samiti", value: "hs"},
];

module.exports = React.createClass({
    getInitialState: function () {
        return{
            name: "",
            club: "",
            date: "",
            venue: "",
            desc: ""
        }
    },
    addEvent:function(e){
        e.preventDefault();
        actions.addEvent(this.state);
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
            <div className="container-fluid">
                <form className="form" onSubmit={this.addEvent}>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <input required type="text" className="form-control" id="name" placeholder="Name of Event" value={this.state.name} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <select required className="form-control" id="club" value={this.state.club} onChange={this.handleInputChange}>
                                <option disabled hidden>Select Club</option>
                                {
                                    clubs.map(function (club, index) {
                                        return (
                                            <option value={club.value}>{club.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div required className="col-md-2 col-md-offset-4">
                            <input type="date" className="form-control" id="date" placeholder="Date of Event" value={this.state.date} onChange={this.handleInputChange}/>
                        </div>
                        <div required className="col-md-2">
                            <input type="text" className="form-control" id="venue" placeholder="Venue of Event" value={this.state.venue} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div required className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <textarea type="text" className="form-control" rows="5" id="desc" placeholder="Description" value={this.state.desc} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-md-offset-5">
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
});