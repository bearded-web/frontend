'use strict';

import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import authStore from '../stores/auth.store';
import setTitle from '../lib/set-title';

import AuthPageLayout from './auth-page-layout';
import PasswordResetForm from './password-reset-form';

export default class PasswordResetOkPage extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    componentDidMount() {
        setTitle(iget('Password reset is successful'));
    }

    render() {
        //TODO mb change text?
        //TODO add popular email sites link (gmail)
        return <AuthPageLayout>
            <p>
                {iget('Check your email.')}
            </p>
        </AuthPageLayout>;
    }
}

