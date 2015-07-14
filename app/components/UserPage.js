/**
 * UserPage
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import usersStore from '../stores/usersStore';
import { create as createStyle } from 'react-style';
import { fetchUser } from '../actions/usersActions';
import connectToStores from '../lib/connectToStores';
import { listOf } from 'react-immutable-proptypes';
import { Model } from '../lib/types';

import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import UserCard from './UserCard';
import Loading from './Loading';
import Breadcrumb from './Breadcrumb';

const S = createStyle({
    loading: {
        marginTop: '2rem',
        fontSize: '2rem'
    }
});

const getState = () => ({ users: usersStore.getRawState().toList() });

@connectToStores([usersStore], getState)
export default class UserPage extends Component {
    static propTypes = {
        users: listOf(Model)
    };
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    componentDidMount() {
        //TODO replace to separate method
        fetchUser({ id: this.getUserId() });
    }

    render() {
        const userId = this.getUserId();
        const user = usersStore.getRawState().get(userId);

        if (!user) {
            return <Row><Loading style={S.loading} text={iget('Loading')}/></Row>;
        }

        const email = user.get('email');

        return <UserCard user={user}/>;
    }

    getUserId() {
        return this.context.router.getCurrentParams().userId;
    }
}

if (module.hot) {
    module.hot.accept(['./UserCard']);
}
