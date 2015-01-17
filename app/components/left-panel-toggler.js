var { Button } = Bootstrap;

var LeftPanelToggler = React.createClass({
    mixins: [FluxMixin],

    onClick: function() {
        this.getFlux().actions.app.toggleLeftPanel();
    },

    render: function() {
        return (
            <Button bsStyle="primary" onClick={this.onClick} className="navbar-minimalize minimalize-styl-2">
                <i className="fa fa-bars"></i>
            </Button>
        );
    }
});

module.exports = LeftPanelToggler;
