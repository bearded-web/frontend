'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';

import { Input } from 'react-bootstrap';

export default class PasswordResetEndForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onSubmit',
            'onChange'
        ]);

        this.state = {
            password: ''
        };

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onChange() {
        this.setState({
            password: this.refs.password.getValue()
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const password = this.refs.password.getValue();

        this.props.onSubmit({ password });
    }

    render() {
        const { password } = this.state;
        const { disabled } = this.props;

        const btnDisabled = disabled || password.length < 8;

        return <form onSubmit={this.onSubmit}>
            <Input ref="password"
                   value={password}
                   onChange={this.onChange}
                   placeholder={iget('New password')}
                   help={iget('more then 8 symbols')}
                   disabled={disabled}
                   type="password"/>
            <button disabled={btnDisabled} type="submit" className="btn btn-primary block full-width m-b">
                {iget('Set new password')}
            </button>
        </form>;
    }
}

PasswordResetEndForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

PasswordResetEndForm.defaultProps = {
    disabled: false
};

