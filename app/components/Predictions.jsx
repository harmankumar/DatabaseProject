var React = require("react");

var PredictionInfo = require("./PredictionInfo.jsx");
var actions = require("../actions/predictionActions");

var houses = ["Stark", "Targaryen", "Greyjoy", "Baratheon", "Lannister", "Frey", "Martell", "Tyrell", "Tully", "Arryn"];

module.exports = React.createClass({
    getInitialState: function () {
        return {
            name: "",
            house: "",
            gender: "",
            pred: -1,
            actual: -1,
            popular: -1,
            book1: -1,
            book2: -1,
            book3: -1,
            book4: -1,
            book5: -1,
            sort: "name",
            page: 1
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
    getAvgPopularity:function () {
        actions.getAvgPopularity(this.state);
    },
    getAvgPrediction:function () {
        actions.getAvgPrediction(this.state);
    },
    render: function () {
        var name = this.state.name;
        var page = this.state.page;
        var numPerPage = 20;
        var numPages = (this.props.predictions.length/numPerPage)+1;

        var rows1 = [];
        var i;
        for (i = 1; i <= numPages; i++)
            rows1.push(<option value={i}>{i}</option>);

        var rows2 = [];
        for (i = 0; i < houses.length; i++)
            rows2.push(<option value={houses[i]}>{houses[i]}</option>);

        if (!this.props.session)
            content = <p>Please login to view predictions!</p>;
        else
            content =
            <div>
                <form className="form">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <select required className="form-control" id="sort" onChange={this.handleInputChange}>
                                <option selected disabled>Sort By</option>
                                <option value="name">Name</option>
                                <option value="popularity">Popularity (inc)</option>
                                <option value="popularity DESC">Popularity (dec)</option>
                                <option value="plod">Chance of Death</option>
                                <option value="alive">Chance of Survival</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-md-offset-1">
                            <select required className="form-control" id="page" onChange={this.handleInputChange}>
                                <option selected disabled>Select Page</option>
                                {rows1}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <input required type="text" className="form-control" id="name" placeholder="Search Name" value={this.state.name} onChange={this.handleInputChange}/>
                        </div>
                        <div className="col-md-2">
                            <select required className="form-control" id="house" onChange={this.handleInputChange}>
                                <option selected disabled>Select House</option>
                                <option value="">None</option>
                                {rows2}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-md-offset-2">
                            <select required className="form-control" id="gender" onChange={this.handleInputChange}>
                                <option selected disabled>Gender</option>
                                <option value="">Either</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select required className="form-control" id="actual" onChange={this.handleInputChange}>
                                <option selected disabled>Status</option>
                                <option value={-1}>Either</option>
                                <option value={0}>Dead</option>
                                <option value={1}>Alive</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select required className="form-control" id="pred" onChange={this.handleInputChange}>
                                <option selected disabled>Prediction</option>
                                <option value={-1}>Either</option>
                                <option value={0}>Will Die</option>
                                <option value={1}>Will Survive</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select required className="form-control" id="popular" onChange={this.handleInputChange}>
                                <option selected disabled>Popularity</option>
                                <option value={-1}>Either</option>
                                <option value={1}>Popular</option>
                                <option value={0}>Not Popular</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-md-offset-1">
                            <select required className="form-control" id="book1" onChange={this.handleInputChange}>
                                <option selected disabled>Book One</option>
                                <option value={-1}>Don't Care</option>
                                <option value={1}>Present</option>
                                <option value={0}>Absent</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select required className="form-control" id="book2" onChange={this.handleInputChange}>
                                <option selected disabled>Book Two</option>
                                <option value={-1}>Don't Care</option>
                                <option value={1}>Present</option>
                                <option value={0}>Absent</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select required className="form-control" id="book3" onChange={this.handleInputChange}>
                                <option selected disabled>Book Three</option>
                                <option value={-1}>Don't Care</option>
                                <option value={1}>Present</option>
                                <option value={0}>Absent</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select required className="form-control" id="book4" onChange={this.handleInputChange}>
                                <option selected disabled>Book Four</option>
                                <option value={-1}>Don't Care</option>
                                <option value={1}>Present</option>
                                <option value={0}>Absent</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select required className="form-control" id="book5" onChange={this.handleInputChange}>
                                <option selected disabled>Book Five</option>
                                <option value={-1}>Don't Care</option>
                                <option value={1}>Present</option>
                                <option value={0}>Absent</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-2">
                            <button type="button" className="btn btn-primary btn-block" onClick={this.getAvgPopularity}>Find Average Popularity</button>
                        </div>
                        <div className="col-md-4">
                            <button type="button" className="btn btn-primary btn-block" onClick={this.getAvgPrediction}>Find Average Survival Chance</button>
                        </div>
                    </div>
                </form>
                <div className="text-center"><b>{this.props.predictions.length} records found!</b></div>
                <br/>
                {
                    this.props.predictions.map(function (prediction, index) {
                        if (index >= (page-1)*numPerPage && index < page*numPerPage)
                            return (
                                <PredictionInfo prediction={prediction}/>
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