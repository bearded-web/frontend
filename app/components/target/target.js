var Router = require('react-router'),
    TargetHeader = require('../target-header'),
    Widget = require('../widget');

module.exports = React.createClass({
    mixins: [
        Router.State,
        Router.Navigation,
        FluxMixin
    ],

    removeTarget: function() {
        this.getFlux().actions.target.removeTarget(this.getTarget());
    },

    getTarget: function() {
        return this.getFlux().store('TargetsStore').getTarget(this.getParams().targetId);
    },

    render: function() {
        var target = this.getTarget();

        if (!target) {
            return (
                <div>{iget('No target Found')}</div>
            );
        }

        return (
            <div>
                <TargetHeader title={target.web.domain} removeTarget={this.removeTarget}/>
            </div>
        );
    }
});
