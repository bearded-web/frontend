'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import { updateSettings, changePassword } from '../actions/settings.actions';

import { Input, Button } from 'react-bootstrap';

export default class ChangePasswordForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onFieldChange',
            'onFormSubmit',
            'getPasswords'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    getPasswords() {
        const password = this.refs.password.getValue();
        const oldPassword = this.refs.oldPassword.getValue();

        return { password, oldPassword };
    }

    onFieldChange() {
        updateSettings(this.getPasswords());
    }

    onFormSubmit(e) {
        e.preventDefault();

        changePassword(this.getPasswords());
    }

    render() {
        const { password, oldPassword, disabled, error } = this.props;
        const btnDisabled = disabled ||
            !password ||
            password.length < 6;

        return <form onSubmit={this.onFormSubmit}>
            <Input ref="oldPassword"
                   value={oldPassword}
                   label={iget('Old password')}
                   disabled={disabled}
                   onChange={this.onFieldChange}
                   type="password"/>
            <Input ref="password"
                   value={password}
                   label={iget('New password')}
                   help={iget('more then 6 symbols')}
                   disabled={disabled}
                   onChange={this.onFieldChange}
                   type="password"/>

            <Button type="submit"
                    bsStyle="primary"
                    disabled={btnDisabled}>

                {iget('Change password')}
            </Button>

            {error && this.renderError(error)}
        </form>;
    }

    renderError(message) {
        return <p className="text-danger form-control-static">{message}</p>;
    }
}

ChangePasswordForm.propTypes = {
    password: PropTypes.string,
    oldPassword: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string
};
ChangePasswordForm.defaultProps = {
    password: '',
    oldPassword: '',
    disabled: false,
    error: ''
};

