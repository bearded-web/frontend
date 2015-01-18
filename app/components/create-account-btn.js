var React = require('react');

module.exports = React.createClass({
    mixins: [FluxMixin],

    onCreateAccountClick: function() {
        this.getFlux().actions.app.showRegister();
    },

    render: function() {
        return (
            <div>
                <p className="text-muted text-center">
                    <small>Do not have an account</small>
                </p>
                <a onClick={this.onCreateAccountClick} className="btn btn-sm btn-white btn-block">Create an account</a>
            </div>
        );
    }
});
