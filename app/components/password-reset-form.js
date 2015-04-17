'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';

import { Input } from 'react-bootstrap';

export default class PasswordResetForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onSubmit'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onSubmit(e) {
        e.preventDefault();

        const email = this.refs.email.getValue();

        this.props.onSubmit({ email });
    }

    render() {
        const { error, disabled } = this.props;

        return <form className="m-t" role="form" onSubmit={this.onSubmit}>
            <Input type="email"
                   ref="email"
                   placeholder="Email"
                   disabled={disabled}
                   autoFocus={true}
                   onChange={this.onChange}
                   required/>
            <button disabled={disabled}
                    type="submit"
                    className="btn btn-primary block full-width m-b">
                {iget('Send reset link to email')}
            </button>
            <div className="text-danger">
                {error}
            </div>
        </form>;
    }
}

PasswordResetForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    disabled: PropTypes.bool
};

PasswordResetForm.defaultProps = {
    error: '',
    disabled: false
};

