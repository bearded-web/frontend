'use strict';

import CreateAccountBtn from './create-account-btn';
import Router from 'react-router';
import GoToLoginBtn from './go-to-login-btn';
import Logo from './logo';

var LoginOverlay = React.createClass({
    mixins: [FluxMixin, Router.State],


    onSubmit: function(event) {
        var isSignUp = this.getFlux().store('AppStore').loginPageState === 'signup',
            email = this.refs.email.getDOMNode().value,
            password = this.refs.password.getDOMNode().value;

        event.preventDefault();

        this.getFlux().actions.app[isSignUp ? 'signUp' : 'logIn'](email, password);
    },


    render: function() {
        var app = this.getFlux().store('AppStore'),
            isSignUp = app.loginPageState === 'signup',
            loginInProcess = app.loginInProcess,
            loginError = app.loginError || '';

        return (
            <div className="auth-overlay">
                <div className="middle-box text-center loginscreen  animated fadeInDown">
                    <div>
                        <div>
                            <Logo/>
                        </div>
                        <br/>
                        <br/>
                        <p>{iget('Greate system to protect your business')}</p>
                        <p>{isSignUp ? iget('Create account') : iget('Log in')}. {iget('To see it in action.')}</p>
                        <form className="m-t" role="form" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input disabled={loginInProcess} ref="email" type="email" className="form-control" placeholder="Email" required />
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
                                <small>{iget('Forgot password')}</small>
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
