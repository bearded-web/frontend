/**
 * UsersPage
 */

import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { fetchUsers } from '../actions/usersActions';

import { Row, Col } from 'react-bootstrap';
import Ibox, { IboxContent, IboxTitle } from './ibox';
import UsersList from './UsersList';
import UserCreateForm from './UserCreateForm';
import Breadcrumb from './Breadcrumb';
import { Link } from 'react-router';

export default class UsersPage extends Component {
    static propTypes = {};
    shouldComponentUpdate = shouldComponentUpdate;

    componentDidMount() {
        fetchUsers();
    }

    render() {
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
                    <UsersList/>
                </IboxContent></Ibox>
            </Col>
        </Row>;
    }
}

