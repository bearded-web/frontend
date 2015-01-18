var Router = require('react-router'),
    Header = require('../header');

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
        var target = this.getTarget(),
            title;

        if (!target) {
            return (
                <div>{iget('No target Found')}</div>
            );
        }

        title = iget('Target') + ': ' + target.web.domain;

        return (
            <div>
                <Header title={title} />
                <a onClick={this.removeTarget}>Delete</a>
            </div>
        );
    }
});
