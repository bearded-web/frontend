/**
 * UsersPage
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { fetchPage } from '../actions/usersActions';
import connectToStores from '../lib/connectToStores';
import usersStore from '../stores/usersStore';
import usersListStore from '../stores/usersListStore';
import { listOf } from 'react-immutable-proptypes';
import { Model } from '../lib/types';

import { Row, Col } from 'react-bootstrap';
import Ibox, { IboxContent, IboxTitle } from './ibox';
import UsersList from './UsersList';
import UserCreateForm from './UserCreateForm';
import Breadcrumb from './Breadcrumb';
import { Link } from 'react-router';
import UsersPagination from './UsersPagination';

function getState() {
    const state = usersListStore.getState();
    const ids = usersListStore.getIds();
    state.users = usersStore.getUsers(ids);

    return state;
}

@connectToStores([usersStore, usersListStore], getState)
export default class UsersPage extends Component {
    static propTypes = {
        query: PropTypes.shape({
            page: PropTypes.string
        }),
        loading: PropTypes.bool.isRequired,
        users: listOf(Model),
        pageSize: PropTypes.number.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    componentDidMount() {
        fetchPage({
            page: this.props.query.page,
            pageSize: this.props.pageSize
        });
    }

    componentWillReceiveProps(newProps) {
        if (this.props.query.page !== newProps.query.page) {
            fetchPage({
                page: newProps.query.page,
                pageSize: newProps.pageSize
            });
        }
    }

    render() {
        const { users, loading } = this.props;
        const listStyle = { opacity: loading ? 0.5 : 1 };

        let page = parseInt(this.props.query.page, 10) || 1;

        return <Row>
            <Col xs={12}>
                <Breadcrumb>
                    <Link to="control-panel">{iget('Control panel')}</Link>
                    <Link to="users">{iget('Users')}</Link>
                </Breadcrumb>
            </Col>
            <Col xs={12} sm={4}>
                <Ibox>
                    <IboxTitle title={iget('Add user')}/>
                    <IboxContent>
                        <UserCreateForm/>
                    </IboxContent>
                </Ibox>
            </Col>
            <Col xs={12} sm={8}>
                <Ibox><IboxContent>
                    <UsersList users={users}/>
                    <UsersPagination page={page}/>
                </IboxContent></Ibox>
            </Col>
        </Row>;
    }
}

