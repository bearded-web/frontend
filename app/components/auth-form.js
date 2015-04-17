'use strict';

import { PropTypes, Component, findDOMNode } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';

import { Input } from 'react-bootstrap';

export default class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onSubmit'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onSubmit({
            email: this.refs.email.getValue(),
            password: this.refs.password.getValue()
        });
    }

    render() {
        const { disabled, error, submitLabel } = this.props;

        const isSignUp = false;

        return <form className="m-t" role="form" onSubmit={this.onSubmit}>
            <Input disabled={disabled}
                   ref="email"
                   type="email"
                   autoFocus={true}
                   placeholder="Email"
                   required/>
            <Input disabled={disabled} ref="password" type="password"  placeholder="Password" required/>
            <button disabled={disabled} type="submit" className="btn btn-primary block full-width m-b">
                {submitLabel}
            </button>
            <p className="static-form-control text-danger">
                {error}
            </p>
        </form>;
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    submitLabel: PropTypes.string
};

LoginForm.defaultProps = {
    disabled: false,
    error: '',
    submitLabel: iget('Go')
};

