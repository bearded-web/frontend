import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import { resetPassword } from '../actions/auth.actions';
import authStore from '../stores/auth.store';
import setTitle from '../lib/set-title';

import AuthPageLayout from './auth-page-layout';
import PasswordResetForm from './password-reset-form';
import { Link } from 'react-router';

export default class PasswordResetPage extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onSubmit',
            'onStoreChange'
        ]);

        this.state = this.getState();

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    componentDidMount() {
        setTitle(iget('Reset password'));

        authStore.onChange(this.onStoreChange);
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

    onSubmit({ email }) {
        resetPassword({ email });
    }

    render() {
        const { resetPasswordError, loading } = this.state;

        return <AuthPageLayout>
            <p>
                {iget('Leave your email and we will send you reset link')}
            </p>

            <PasswordResetForm
                error={resetPasswordError}
                disabled={loading}
                onSubmit={this.onSubmit}/>

            <Link to="login">
                <small>{iget('Login')}</small>
            </Link>
        </AuthPageLayout>;
    }
}

PasswordResetPage.propTypes = {};
