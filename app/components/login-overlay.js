module.exports = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        app: React.PropTypes.object.isRequired
    },

    onSubmit: function(event) {
        var email = this.refs.email.getDOMNode().value,
            password = this.refs.password.getDOMNode().value;

        event.preventDefault();

        this.getFlux().actions.user.logIn(email, password);
    },


    render: function() {
        var app = this.props.app,
            loginInProcess = app.loginInProcess,
            loginError = app.loginError || '';

        return (
            <div className="auth-overlay">
                <div className="middle-box text-center loginscreen  animated fadeInDown">
                    <div>
                        <div>
                            <h1 className="logo-name">B+</h1>
                        </div>
                        <h3>Welcome to Barbudo</h3>
                        <p>Greate systet to protect your business</p>
                        <p>Login in. To see it in action.</p>
                        <form className="m-t" role="form" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input disabled={loginInProcess} ref="email" type="email" className="form-control" placeholder="Username" required />
                            </div>
                            <div className="form-group">
                                <input disabled={loginInProcess} ref="password" type="password" className="form-control" placeholder="Password" required />
                            </div>
                            <button disabled={loginInProcess} type="submit" className="btn btn-primary block full-width m-b">Login</button>
                            <div className="text-danger">
                                {loginError}
                            </div>
                            <a href="#">
                                <small>Forgot password</small>
                            </a>
                            <p className="text-muted text-center">
                                <small>Do not have an account</small>
                            </p>
                            <a className="btn btn-sm btn-white btn-block" href="register.html">Create an account</a>
                        </form>
                        <p className="m-t">
                            <small>Barbudo team &copy; 2015</small>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
});

