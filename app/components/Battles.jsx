var React = require("react");

var BattleInfo = require("./BattleInfo.jsx");
var actions = require("../actions/battleActions");

var houses = ["Stark", "Targaryen", "Greyjoy", "Baratheon", "Lannister", "Frey", "Martell", "Tyrell", "Tully", "Arryn", "Watch"];

module.exports = React.createClass({
    getInitialState: function () {
        return {
            name: "",
            region: "",
            type: "",
            house1: "",
            house2: "",
            winner: "",
            sort: "name"
        }
    },
    componentWillMount: function () {
        actions.changeFilter(this.getInitialState());
    },
    handleInputChange:function(e){
        e.preventDefault();
        var name = e.target.id;
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
        actions.changeFilter(this.state);
    },
    render: function () {
        var rows = [];
        for (i = 0; i < houses.length; i++)
            rows.push(<option value={houses[i]}>{houses[i]}</option>);

        if (!this.props.session)
            content = <p>Please login to view battles!</p>;
        else
            content =
                <div>
                    <form className="form">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <select required className="form-control" id="sort" onChange={this.handleInputChange}>
                                    <option selected disabled>Sort By</option>
                                    <option value="name">Name</option>
                                    <option value="(attacker_size + defender_size) DESC">Battle Size</option>
                                    <option value="year">Battle Year</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2 col-md-offset-1">
                                <select required className="form-control" id="house1" onChange={this.handleInputChange}>
                                    <option selected disabled>Involved House #1</option>
                                    <option value="">Any</option>
                                    {rows}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <input required type="text" className="form-control" id="name" placeholder="Search Name" value={this.state.name} onChange={this.handleInputChange}/>
                            </div>
                            <div className="col-md-2">
                                <select required className="form-control" id="house2" onChange={this.handleInputChange}>
                                    <option selected disabled>Involved House #2</option>
                                    <option value="">Any</option>
                                    {rows}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2 col-md-offset-2">
                                <select required className="form-control" id="type" onChange={this.handleInputChange}>
                                    <option selected disabled>Battle Type</option>
                                    <option value="">Any</option>
                                    <option value="pitched battle">Pitched Battle</option>
                                    <option value="ambush">Ambush</option>
                                    <option value="siege">Seige</option>
                                    <option value="razing">Razing</option>
                                </select>
                            </div>
                            <div className="col-md-2 col-md-offset-1">
                                <select required className="form-control" id="winner" onChange={this.handleInputChange}>
                                    <option selected disabled>Winning House</option>
                                    <option value="">Any</option>
                                    {rows}
                                </select>
                            </div>
                            <div className="col-md-2 col-md-offset-1">
                                <select required className="form-control" id="region" onChange={this.handleInputChange}>
                                    <option selected disabled>Region</option>
                                    <option value="">Any</option>
                                    <option value="The North">The North</option>
                                    <option value="The Reach">The Reach</option>
                                    <option value="The Westerlands">The Westerlands</option>
                                    <option value="The Riverlands">The Riverlands</option>
                                    <option value="The Stormlands">The Stormlands</option>
                                    <option value="The Crownlands">The Crownlands</option>
                                    <option value="Beyond the Wall">Beyond the Wall</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className="text-center"><b>{this.props.battles.length} records found!</b></div>
                    <br/>
                    {
                        this.props.battles.map(function (battle, index) {
                            return(
                                <BattleInfo battle={battle}/>
                            )
                        })
                    }
                </div>;
        return(
            <div className="container">
                {content}
            </div>
        )
    }
});