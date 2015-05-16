import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import authStore from '../stores/auth.store';
import { signUp, cleanError } from '../actions/auth.actions';
import setTitle from '../lib/set-title';

import AuthPageLayout from './auth-page-layout';
import AuthForm from './auth-form';
import { Link } from 'react-router';

export default class SignupPage extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, ['onSubmit', 'onStoreChange']);

        this.state = this.getState();

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    componentDidMount() {
        authStore.onChange(this.onStoreChange);
        setTitle(iget('Sign up'));
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
        signUp(email, password);
    }

    render() {
        const { loading, loginError } = this.state;

        return <AuthPageLayout>
            <p>{iget('Create account')}. {iget('To see it in action.')}</p>
            <AuthForm onSubmit={this.onSubmit}
                      disabled={loading}
                      submitLabel={iget('Sign up')}
                      error={loginError}/>

            <p className="text-muted text-center">
                <small>{iget('Already have an account?')}</small>
            </p>

            <Link to="login" className="btn btn-sm btn-white btn-block">
                {iget('Login')}
            </Link>
        </AuthPageLayout>;
    }
}

