'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import { setNewPassword } from '../actions/auth.actions';
import authStore from '../stores/auth.store';
import setTitle from '../lib/set-title';

import AuthPageLayout from './auth-page-layout';
import Form from './password-reset-end-form';

export default class PasswordResetEndPage extends Component {
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
        setTitle(iget('Set new password'));

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

    onSubmit({ password }) {
        const { token } = this.context.router.getCurrentQuery();

        setNewPassword(token, password);
    }

    render() {
        const { resetPasswordError, loading } = this.state;
        let { error, token } = this.context.router.getCurrentQuery();

        if (!error && !token) {
            error = iget('Token not provided');
        }

        return <AuthPageLayout>
            {error && <p className="text-danger">
                {error}
            </p>}

            {token && <Form token={token} disabled={loading} onSubmit={this.onSubmit}/>}

            <p className="text-danger">
                {resetPasswordError}
            </p>
        </AuthPageLayout>;
    }
}

PasswordResetEndPage.contextTypes = {
    router: PropTypes.func
};
