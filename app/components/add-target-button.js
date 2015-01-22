var ModalTrigger = require('react-bootstrap/ModalTrigger'),
    Button = require('react-bootstrap/Button'),
    Fa = require('./fa'),
    AddTargetModal = require('app/components/add-target-modal');

module.exports = React.createClass({
    mixins: [FluxMixin],

    onClick: function() {
        this.getFlux().actions.target.openAddTargetModal();
    },

    render: function() {
        return (
            <Button bsStyle="primary" onClick={this.onClick}>
                <Fa icon="plus" />
                {__('Add target')}
            </Button>
        );
    }
});
