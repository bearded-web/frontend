/**
 * UserCreateForm
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { map } from 'react-immutable-proptypes';
import autobind from '../lib/autobind';
import connectToStores from '../lib/connectToStores';
import newUserStore from '../stores/newUserStore';
import { changeNewUser, createUser } from '../actions/usersActions';

import { Input, Button } from 'react-bootstrap';

@connectToStores([newUserStore], () => newUserStore.getState())
export default class UserCreateForm extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        disabled: PropTypes.bool.isRequired,
        user: map,
        error: PropTypes.string
    };
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    onSubmit(e) {
        e.preventDefault();

        if (!this.props.disabled) createUser(this.props.user, this.context.router);
    }

    @autobind
    onChange() {
        changeNewUser(this.props.user.merge({
            email: this.refs.email.getValue(),
            password: this.refs.password.getValue(),
            admin: this.refs.admin.getChecked()
        }));
    }

    render() {
        const { user, disabled, loading, error } = this.props;
        const { email, password, admin } = user.toObject();
        const btnDisabled = !!(disabled || loading || error);

        return <form onSubmit={this.onSubmit}>
            <Input
                value={email}
                onChange={this.onChange}
                ref="email"
                disabled={loading}
                label={iget('User email')}
                placeholder={iget('email@example.com')}
                type="email"/>
            <Input
                value={password}
                onChange={this.onChange}
                ref="password"
                disabled={loading}
                required
                label={iget('Password')}
                type="password"/>

            <Input
                checked={admin}
                onChange={this.onChange}
                disabled={loading}
                ref="admin"
                label={iget('Grant admin rights')}
                type="checkbox"/>

            <p className="text-danger">
                {error}
            </p>
            <Button
                disabled={btnDisabled}
                type="submit"
                bsStyle="primary">
                {iget('Create user')}
            </Button>
        </form>;
    }
}

