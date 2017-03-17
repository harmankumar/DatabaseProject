var React = require("react");

module.exports = React.createClass({
    printName: function(prediction) {
        var name = "";
        if (prediction.title)
            name += prediction.title + " ";
        name += prediction.name;
        if (prediction.house)
            name += " (" + prediction.house + ")";
        return name;
    },
    printHouse: function (prediction) {
        if (prediction.house)
            return "(" + prediction.house + ")";
        return "";
    },
    inBooks: function (prediction) {
        var books = [];
        if (prediction.book1) books.push("One");
        if (prediction.book2) books.push("Two");
        if (prediction.book3) books.push("Three");
        if (prediction.book4) books.push("Four");
        if (prediction.book5) books.push("Five");
        if (books.length == 0) return "None";
        var toRet = books[0];
        for (var i = 1; i < books.length; i++)
            toRet += ", " + books[i];
        return toRet;
    },
    isAlive: function (status) {
        return (status)? "Alive :D" : "Dead :'(";
    },
    isPopular: function (status) {
        return (status)? "POPULAR!" : "NOT POPULAR!";
    },
    willDie: function (status) {
        return (status)? "PREDICTED TO SURVIVE!" : "PREDICTED TO DIE!";
    },
    render: function () {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title pull-left">{this.printName(this.props.prediction)}</div>
                    <div className="pull-right">{this.isAlive(this.props.prediction.actual)}</div>
                    <div className="clearfix"></div>
                </div>
                <div className="panel-body">
                    <b>{this.isPopular(this.props.prediction.ispopular)}</b><br/>
                    <b>Gender:               </b> {this.props.prediction.gender}<br/>
                    <b>Probability of Death: </b> {this.props.prediction.plod}<br/>
                    <b>Popularity:           </b> {this.props.prediction.popularity}<br/>
                    <b>Appears in Books:     </b> {this.inBooks(this.props.prediction)}
                </div>
                <div className="panel-footer">
                    <div className="text-center">{this.willDie(this.props.prediction.pred)}</div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
});