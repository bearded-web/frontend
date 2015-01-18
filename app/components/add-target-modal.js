var Bootstrap = require('react-bootstrap'),
    _ = require('lodash'),
    Fluxxor = require('fluxxor');

var TargetsStore = require('../stores/targets.store');

var { Modal, Input, Button } = Bootstrap,
    ErrorMessage = require('app/components/error-message');

module.exports = React.createClass({
    mixins: [window.FluxMixin],

    propTypes: {
        targetsStore: React.PropTypes.instanceOf(TargetsStore).isRequired
    },

    onSubmit: function(e) {
        e.preventDefault();

        var domain = this.refs.domain.getDOMNode().value,
            targetType = this.refs.targetType.getDOMNode().value;

        this.getFlux().actions.target
            .addTarget(targetType, domain, this.props.targetsStore.project)
    },


    onRequestHide: function() {
        this.getFlux().actions.target.hideModal();
    },

    render: function() {
        var targets = this.props.targetsStore,
            isSending = targets.targetAddInProcess,
            error = targets.targetAddError;

        return (
            <Modal title="My modal" onRequestHide={this.onRequestHide}  animation={true}>
                <form onSubmit={this.onSubmit}>
                    <div className="modal-body">
                        <p>{i18n.gettext('Web is for web. Mobile is for mobile NEED text')}</p>

                        <div className="form-group">
                            <div className="radio">
                                <label>
                                    <input disabled={isSending} ref="targetType" type='radio' defaultChecked value='web' name='targetType' />
                                    <span>{ __('Web url target. Used for websites.')}</span>
                                    <br/>
                                    <span>{__('Enter url which be used to scans and tests.')}</span>
                                    <br/>
                                    <span>{__('Better if it will be root url of your site')}</span>
                                    <input ref="domain" className="form-control input-sm" type="text" placeholder="http://example.com" />

                                </label>
                            </div>
                        </div>
                        <ErrorMessage text={error} />
                    </div>
                    <div className="modal-footer">
                        <Button disabled={isSending}  onClick={this.props.onRequestHide}>Close</Button>
                        <Button disabled={isSending} type="submit">{__('Add target')}</Button>
                    </div>
                </form>
            </Modal>
        );
    }
});
