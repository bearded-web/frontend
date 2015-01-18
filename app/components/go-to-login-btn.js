var React = require('react');

module.exports = React.createClass({
    mixins: [FluxMixin],

    onLoginClick: function() {
        this.getFlux().actions.app.showLogin();
    },

    render: function() {
        return (
            <div>
                <p className="text-muted text-center">
                    <small>{iget('Already have an account?')}</small>
                </p>
                <a onClick={this.onLoginClick} className="btn btn-sm btn-white btn-block">{iget('Login')}</a>
            </div>
        );
    }
});
