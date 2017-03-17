var React = require("react");

var DeathInfo = require("./DeathInfo.jsx");
var actions = require("../actions/deathActions");

var houses = ["Stark", "Targaryen", "Greyjoy", "Baratheon", "Lannister", "Frey", "Martell", "Tyrell", "Tully", "Arryn", "Watch", "Wildling"];

module.exports = React.createClass({
    getInitialState: function () {
        return {
            name: "",
            house: "",
            gender: "",
            noble: -1,
            book: -1,
            sort: "deaths.name",
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
    getBloodyBook:function () {
        actions.getBloodyBook(this.state);
    },
    render: function () {
        var name = this.state.name;
        var page = this.state.page;
        var numPerPage = 20;
        var numPages = (this.props.deaths.length/numPerPage)+1;

        var rows1 = [];
        var i;
        for (i = 1; i <= numPages; i++)
            rows1.push(<option value={i}>{i}</option>);

        var rows2 = [];
        for (i = 0; i < houses.length; i++)
            rows2.push(<option value={houses[i]}>{houses[i]}</option>);

        if (!this.props.session)
            content = <p>Please login to view deaths!</p>;
        else
            content =
                <div>
                    <form className="form">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <select required className="form-control" id="sort" onChange={this.handleInputChange}>
                                    <option selected disabled>Sort By</option>
                                    <option value="deaths.name">Name</option>
                                    <option value="popularity">Popularity (inc)</option>
                                    <option value="popularity DESC">Popularity (dec)</option>
                                    <option value="DeathYear">Year of Death</option>
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
                                    <option selected disabled>Select Allegiance</option>
                                    <option value="">Any</option>
                                    <option value="None">None</option>
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
                            <div className="col-md-2 col-md-offset-1">
                                <select required className="form-control" id="noble" onChange={this.handleInputChange}>
                                    <option selected disabled>Nobility</option>
                                    <option value={-1}>Either</option>
                                    <option value={1}>Noble</option>
                                    <option value={0}>Commoner</option>
                                </select>
                            </div>
                            <div className="col-md-2 col-md-offset-1">
                                <select required className="form-control" id="book" onChange={this.handleInputChange}>
                                    <option selected disabled>Book of Death</option>
                                    <option value={-1}>Any</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                    <option value={4}>Four</option>
                                    <option value={5}>Five</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <button type="button" className="btn btn-primary btn-block" onClick={this.getBloodyBook}>Find Most Bloody Book</button>
                            </div>
                        </div>
                    </form>
                    <div className="text-center"><b>{this.props.deaths.length} records found!</b></div>
                    <br/>
                    {
                        this.props.deaths.map(function (death, index) {
                            if (index >= (page-1)*numPerPage && index < page*numPerPage)
                                return (
                                    <DeathInfo death={death}/>
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