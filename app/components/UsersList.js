/**
 * UsersList
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { listOf, map } from 'react-immutable-proptypes';
import { Model } from '../lib/types'; // change to User
import moment from 'moment';
import autobind from '../lib/autobind';
import { create as createStyle } from 'react-style';
import { cloneDeep } from 'lodash';
import { BY_NICK, BY_CREATED, BY_EMAIL } from '../lib/sortConstants';

import { Table } from 'react-bootstrap';
import Avatar from './avatar';
import Loading from './Loading';
import SortTh from './SortTh';

const S = createStyle({
    row: { cursor: 'pointer' }
});

export default class UsersList extends Component {
    static propTypes = {
        users: listOf(PropTypes.oneOfType([Model, map])),
        sortBy: PropTypes.string,
        loading: PropTypes.bool
    };
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    onRowClick(user) {
        this.context.router.transitionTo('user', { userId: user.get('id') });
    }

    @autobind
    onSortChange(sortBy) {
        const path = this.context.router.getCurrentPath();
        const query = cloneDeep(this.context.router.getCurrentQuery());
        query.sortBy = sortBy;
        this.context.router.transitionTo(path, {}, query);
    }

    render() {
        const { users, loading } = this.props;

        if (loading) return <h2><Loading/></h2>;


        return <Table hover>
            <thead>
            <tr>
                <th></th>
                {this.renderSortTh(BY_NICK, iget('Nickname'))}
                {this.renderSortTh(BY_EMAIL, iget('Email'))}
                {this.renderSortTh(BY_CREATED, iget('Created'))}
                <th>{iget('Is Admin')}</th>
            </tr>
            </thead>
            <tbody>
            {users.toArray().map(this.renderRow)}
            </tbody>
        </Table>;
    }

    @autobind
    renderSortTh(field, text) {
        const { sortBy } = this.props;

        return <SortTh
            field={field}
            value={sortBy}
            onChange={this.onSortChange}>
            {text}
        </SortTh>;
    }

    @autobind
    renderRow(user) {
        const { id, avatar, email, created, admin, nickname } = user.toObject();
        const createdStr = moment(created).format('YYYY-MM-DD HH:mm');

        return <tr
            key={id}
            onClick={e => this.onRowClick(user, e)}
            style={S.row}>
            <td><Avatar avatar={avatar} size={20}/></td>
            <td>{nickname}</td>
            <td>{email}</td>
            <td>{createdStr}</td>
            <td>{admin.toString()}</td>
        </tr>;
    }
}

