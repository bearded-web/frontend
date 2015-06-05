/**
 * UsersList
 */

import { PropTypes, Component, addons } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { listOf, map } from 'react-immutable-proptypes';
import { Model } from '../lib/types'; // change to User
import usersStore from '../stores/usersStore';
import moment from 'moment';
import autobind from '../lib/autobind';
import { create as createStyle } from 'react-style';

import { Table } from 'react-bootstrap';
import Avatar from './avatar';
import Loading from './Loading';

const { CSSTransitionGroup } = addons;

const S = createStyle({
    row: { cursor: 'pointer' }
});

export default class UsersList extends Component {
    static propTypes = {
        users: listOf(PropTypes.oneOfType([Model, map]))
    };
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    onRowClick(user) {
        this.context.router.transitionTo('user', { userId: user.get('id') });
    }

    render() {
        const { users } = this.props;
        const hasUsers = users.size > 0;

        if (!hasUsers) return <h2><Loading/></h2>;

        return <Table hover>
            <thead>
            <tr>
                <th></th>
                <th>Email</th>
                <th>Created</th>
                <th>IsAdmin</th>
            </tr>
            </thead>
            <tbody>
                {users.toArray().map(this.renderRow)}
            </tbody>
        </Table>;
    }

    //
    @autobind
    renderRow(user) {
        const { id, avatar, email, created, admin } = user.toObject();
        const createdStr = moment(created).format('YYYY-MM-DD HH:mm');

        return <tr
            key={id}
            onClick={e => this.onRowClick(user, e)}
            style={S.row}>
            <td><Avatar avatar={avatar} size={20}/></td>
            <td>{email}</td>
            <td>{createdStr}</td>
            <td>{admin.toString()}</td>
        </tr>;
    }
}

