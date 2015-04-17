'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

export default class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const isSignUp = false;
        const loginInProcess = false;
        const loginError = '';

        return <form className="m-t" role="form" onSubmit={this.onSubmit}>
            <div className="form-group">
                <input disabled={loginInProcess} ref="email" type="email" className="form-control" placeholder="Email"
                       required/>
            </div>
            <div className="form-group">
                <input disabled={loginInProcess} ref="password" type="password" className="form-control"
                       placeholder="Password" required/>
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

            <p className="text-muted text-center">
                <small>{iget('Already have an account?')}</small>
            </p>
            <a onClick={this.onLoginClick} className="btn btn-sm btn-white btn-block">{iget('Login')}</a>
        </form>;
    }
}

LoginForm.propTypes = {};

