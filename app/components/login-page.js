'use strict';

import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import authStore from '../stores/auth.store';
import { login, cleanError } from '../actions/auth.actions';
import setTitle from '../lib/set-title';
import { get as getConfig } from '../lib/config';

import AuthPageLayout from './auth-page-layout';
import AuthForm from './auth-form';
import { Link } from 'react-router';

export default class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, ['onSubmit', 'onStoreChange']);

        this.state = this.getState();

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    componentDidMount() {
        authStore.onChange(this.onStoreChange);
        setTitle(iget('Login'));
        cleanError();
    }


    componentWillUnmount() {
        authStore.offChange(this.onStoreChange);
    }

    onStoreChange() {
        this.setState(this.getState());
    }

    getState() {
        return authStore.getState();
    }

    onSubmit({ email, password }) {
        login(email, password);
    }

    render() {
        const { loading, loginError } = this.state;
        const { signup: { disable = false } } = getConfig();

        const isSignUp = false;
        //TODO mb change text?
        //TODO add popular email sites link (gmail)
        return <AuthPageLayout>
            <p>{isSignUp ? iget('Create account') : iget('Log in')}. {iget('To see it in action.')}</p>
            <AuthForm onSubmit={this.onSubmit}
                      disabled={loading}
                      submitLabel={iget('Login')}
                      error={loginError}/>

            <Link to="password-reset">
                <small>{iget('Forgot password')}</small>
            </Link>

            <p className="text-muted text-center">
                <small>{iget('Don\'t have an account?')}</small>
            </p>
            {disable || <Link to="signup" className="btn btn-sm btn-white btn-block">
                {iget('Sign up')}
            </Link>}
        </AuthPageLayout>;
    }
}

