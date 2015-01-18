var CreateAccountBtn = require('./create-account-btn'),
    Router = require('react-router'),
    GoToLoginBtn = require('./go-to-login-btn');

var LoginOverlay = React.createClass({
    mixins: [FluxMixin, Router.State],


    onSubmit: function(event) {
        var email = this.refs.email.getDOMNode().value,
            password = this.refs.password.getDOMNode().value;

        event.preventDefault();

        this.getFlux().actions.user[this.isActive('signup') ? 'signUp' : 'logIn'](email, password);
    },


    render: function() {
        var app = this.getFlux().store('AppStore'),
            isSignUp = this.isActive('signup'),
            loginInProcess = app.loginInProcess,
            loginError = app.loginError || '';

        return (
            <div className="auth-overlay">
                <div className="middle-box text-center loginscreen  animated fadeInDown">
                    <div>
                        <div>
                            <h1 className="logo-name">B+</h1>
                        </div>
                        <h3>{isSignUp ? iget('Sign up') : iget('Welcome to Barbudo')}</h3>
                        <p>Greate systet to protect your business</p>
                        <p>{isSignUp ? iget('Create account') : iget('Log in')}. To see it in action.</p>
                        <form className="m-t" role="form" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input disabled={loginInProcess} ref="email" type="email" className="form-control" placeholder="Username" required />
                            </div>
                            <div className="form-group">
                                <input disabled={loginInProcess} ref="password" type="password" className="form-control" placeholder="Password" required />
                            </div>
                            <button disabled={loginInProcess} type="submit" className="btn btn-primary block full-width m-b">
                                {isSignUp ? iget('Create account') : iget('Login')}
                            </button>
                            <div className="text-danger">
                                {loginError}
                            </div>
                            <a href="#">
                                <small>Forgot password</small>
                            </a>

                            {isSignUp ? <GoToLoginBtn /> : <CreateAccountBtn />}

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

module.exports = LoginOverlay;
