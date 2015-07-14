/**
 * SystemOverview
 */

import { PropTypes, Component } from 'react';

import { Row, Col } from 'react-bootstrap';
import Ibox, { IboxTitle, IboxContent } from './ibox';
import { Link } from 'react-router';

export default class SystemOverview extends Component {
    static propTypes = {

    };

    render() {
        return <Row>
            <Col xs={12} sm={6} lg={4}><Ibox>
                <IboxTitle>
                    <Link to="users">{iget('Users')}</Link>
                </IboxTitle>
                <IboxContent>Last 5 users</IboxContent>
            </Ibox></Col>
            <Col xs={12} sm={6} lg={4}><Ibox>
                <IboxTitle>
                    <Link to="agents">{iget('Agents')}</Link>
                </IboxTitle>
                <IboxContent><br/><br/><br/><br/></IboxContent>
            </Ibox></Col>
            <Col xs={12} sm={6} lg={4}><Ibox>
                <IboxTitle>
                    <Link to="plans">{iget('Plans')}</Link>
                </IboxTitle>
                <IboxContent><br/><br/><br/><br/></IboxContent>
            </Ibox></Col>
            <Col xs={12} sm={6} lg={4}><Ibox>
                <IboxTitle>
                    <Link to="projects">{iget('Projects')}</Link>
                </IboxTitle>
                <IboxContent><br/><br/><br/><br/></IboxContent>
            </Ibox></Col>
        </Row>;
    }
}
