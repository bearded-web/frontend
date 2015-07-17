/**
 * RecentUsers
 */

import { PropTypes, Component } from 'react';
import { context } from '../lib/nf';
import { fetchRecentUsers } from '../mutators/userMutators';
import purify from '../lib/purify';
import { values } from 'lodash';
import moment from 'moment';
import Avatar from './avatar';

const cursors = {
    users: ['users']
};

@context({ cursors }, { fetchRecentUsers })
@purify
export default class RecentUsers extends Component {
    static propTypes = {
        fetchRecentUsers: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.fetchRecentUsers();
    }

    render() {
        const users = values(this.props.users)
            .sort((a, b) => moment(a.created).isBefore(b.created))
            .slice(0, 5)
            .map(this.renderUser);

        return <div>
            {users}
        </div>;
    }

    renderUser(user) {
        const { id, avatar, nickname } = user;
        return <div key={id}>
            <hr/>
           <Avatar avatar={avatar}/>
           &nbsp;
           {nickname}
        </div>;
    }
}
