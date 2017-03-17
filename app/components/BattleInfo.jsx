var React = require("react");

module.exports = React.createClass({
    listHouses: function (key, battle) {
        var list = battle[key + "_1"];
        if (battle[key + "_2"]) list += ", " + battle[key + "_2"];
        if (battle[key + "_3"]) list += ", " + battle[key + "_3"];
        if (battle[key + "_4"]) list += ", " + battle[key + "_4"];
        return list;
    },
    isVictory: function (result) {
        return (result === "win")? "ATTACKING HOUSE WON!" : "ATTACKING HOUSE LOST!";
    },
    render: function () {
        var battle = this.props.battle;
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title pull-left">{battle.name}</div>
                    <div className="pull-right">{"(" + battle.attacker_king + " vs " + battle.defender_king + ")"}</div>
                    <div className="clearfix"></div>
                </div>
                <div className="panel-body">
                    <b>Attacking Houses:         </b> {this.listHouses("attacker", battle)}<br/>
                    <b>Defending Houses:         </b> {this.listHouses("defender", battle)}<br/>
                    <b>Battle Year:              </b> {battle.year}<br/>
                    <b>Location:                 </b> {battle.location + " (" + battle.region + ")"}<br/>
                    <b>Battle Type:              </b> {battle.battle_type}<br/>
                    <b>Attacking Army Size:      </b> {battle.attacker_size}<br/>
                    <b>Defending Army Size:      </b> {battle.defender_size}<br/>
                </div>
                <div className="panel-footer">
                    <div className="text-center">{this.isVictory(battle.attacker_outcome)}</div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
});