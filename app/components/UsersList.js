/**
 * UsersList
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { listOf, map } from 'react-immutable-proptypes';
import { Model } from '../lib/types'; // change to User
import connectToStores from '../lib/connectToStores';
import usersStore from '../stores/usersStore';
import moment from 'moment';
import autobind from '../lib/autobind';

import { Table } from 'react-bootstrap';
import Avatar from './avatar';

const toMs = str => (new Date(str)).getTime();
const sortByCreated = (b, a) => toMs(a.get('created')) - toMs(b.get('created'));
const getState = () => ({
    users: usersStore.getRawState().toList().sort(sortByCreated)
});

@connectToStores([usersStore], getState)
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

    @autobind
    renderRow(user) {
        const { id, avatar, email, created, admin } = user.toObject();
        const createdStr = moment(created).format('YYYY-MM-DD HH:mm');

        return <tr
            key={id} onClick={e => this.onRowClick(user, e)}>
            <td><Avatar avatar={avatar} size={20}/></td>
            <td>{email}</td>
            <td>{createdStr}</td>
            <td>{admin.toString()}</td>
        </tr>;
    }
}

