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
import setTitle from '../lib/set-title';

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
            page: PropTypes.string,
            sortBy: PropTypes.string
        }),
        loading: PropTypes.bool.isRequired,
        users: listOf(Model),
        pageSize: PropTypes.number.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    componentDidMount() {
        setTitle(iget('Users'));
        fetchPage({
            page: this.props.query.page,
            pageSize: this.props.pageSize
        });
    }

    componentWillReceiveProps(newProps) {
        if (this.props.query.page !== newProps.query.page ||
            this.props.query.sortBy !== newProps.query.sortBy) {
            fetchPage({
                page: newProps.query.page,
                pageSize: newProps.pageSize,
                sortBy: newProps.query.sortBy
            });
        }
    }

    render() {
        const { users, query: { sortBy, page } } = this.props;
        const pageNum = parseInt(page, 10) || 1;

        return <Row>
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
                    <UsersList users={users} sortBy={sortBy}/>
                    <UsersPagination page={pageNum}/>
                </IboxContent></Ibox>
            </Col>
        </Row>;
    }
}
