var ModalTrigger = require('react-bootstrap/ModalTrigger'),
    Button = require('react-bootstrap/Button'),
    AddTargetModal = require('app/components/add-target-modal');

module.exports = React.createClass({
    mixins: [FluxMixin],

    onClick: function() {
        this.getFlux().actions.target.openAddTargetModal();
    },

    render: function() {
        return (
            <Button bsStyle="primary" onClick={this.onClick}>{__('Add target')}</Button>
        );
    }
});
