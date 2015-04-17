'use strict';
var LeftPanelCover = React.createClass({
    mixins: [FluxMixin],

    onClick: function() {
        this.getFlux().actions.app.toggleLeftPanel();
    },

    render: function() {
        return (
            <div onClick={this.onClick} className="left-panel-cover"></div>
        );
    }
});

module.exports = LeftPanelCover;
