/**
 * SystemOverview
 */

import { PropTypes, Component } from 'react';
import { fetchAgents } from '../mutators/agentMutators';
import { fetchPlans } from '../mutators/planMutators';
import purify from '../lib/purify';
import { values } from 'lodash';
import { context } from '../lib/nf';
import { APPROVED } from '../lib/agentStatus';

import { Row, Col } from 'react-bootstrap';
import Ibox, { IboxTitle, IboxContent } from './ibox';
import { Link } from 'react-router';
import Widget from './widget';
import RecentUsers from './RecentUsers';
import RecentProjects from './RecentProjects';

const cursors = {
    agents: ['agents'],
    plans: ['plans'],
    users: ['users']
};

@context({ cursors }, { fetchAgents, fetchPlans })
@purify
export default class SystemOverview extends Component {
    static propTypes = {
        fetchAgents: PropTypes.func.isRequired,
        fetchPlans: PropTypes.func.isRequired,
        plans: PropTypes.object.isRequired,
        agents: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.fetchAgents();
        this.props.fetchPlans();
    }

    render() {
        const { plans } = this.props;
        const plansLength = Object.keys(plans).length;

        return <Row>
            <Col xs={12} sm={4} lg={6}><Row>
                <Col xs={12} lg={6}><Ibox><IboxContent>
                    <Link to="users">
                        <h3>{iget('Recently registered users')}</h3>
                        <RecentUsers/>
                    </Link>
                </IboxContent></Ibox></Col>
                <Col xs={12} lg={6}><Ibox><IboxContent>
                    <Link to="projects">
                        <h3>{iget('Recently created projects')}</h3>
                        <RecentProjects/>
                    </Link>
                </IboxContent></Ibox></Col>
            </Row></Col>
            <Col xs={12} sm={4} lg={3}>
                <Link to="plans">
                    <Widget className="p-lg text-center">
                        <div className="m-b-md">
                            <h1 className="m-xs">{plansLength}</h1>
                            <h3 className="font-bold no-margins">
                                {iget('Plans in system')}
                            </h3>
                            <small>Click to add more</small>
                        </div>
                    </Widget>
                </Link>
            </Col>

            {this.renderAgentsColumn()}
        </Row>;
    }

    renderAgentsColumn() {
        const agents = values(this.props.agents);
        const approved = agents.filter(a => a.status === APPROVED);

        return <Col xs={12} sm={4} lg={3}>
            <Link to="agents">
                {approved.length > 0 && this.renderApprovedAgentsWidget(approved)}
                {approved.length === 0 && this.renderNoAgents()}
            </Link>
        </Col>;
    }

    renderApprovedAgentsWidget(agents) {
        return <Widget type="success" className="text-center">
            <div className="m-b-md">
                <i className="fa fa-server fa-4x"></i>
                <h1 ref="count" className="m-xs">{agents.length}</h1>
                <h3 className="font-bold no-margins">
                    {iget('Agents are working')}
                </h3>
            </div>
        </Widget>;
    }

    renderNoAgents() {
        return <Widget type="danger" className="text-center">
            <div className="m-b-md">
                <i className="fa fa-flash fa-4x"></i>
                <br/><br/>
                <h3 className="font-bold no-margins">
                    {iget('No  approved agents')}
                </h3>
                <small>{iget('You should add and approve agents')}</small>
            </div>
        </Widget>;
    }
}
