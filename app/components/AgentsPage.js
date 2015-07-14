/**
 * AgentsPage
 */

import { PropTypes, Component } from 'react/addons';
import { context } from '../lib/nf';
import setTitle from '../lib/set-title';
import autobind from '../lib/autobind';
import { fetchAgents, approveAgent } from '../mutators/agentMutators';
import { Agent } from '../lib/types';

import { Row, Col, Table, Button } from 'react-bootstrap';

const facets = { agents: 'agents' };

@context({ facets }, { fetchAgents, approveAgent })
export default class AgentsPage extends Component {
    static propTypes = {
        agents: PropTypes.arrayOf(Agent),
        fetchAgents: PropTypes.func.isRequired,
        approveAgent: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.fetchAgents();
        setTitle(iget('Agents'));
    }

    render() {
        const { agents } = this.props;

        return <Row>
            <Col xs={12}>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>{iget('#')}</th>
                        <th>{iget('Name')}</th>
                        <th>{iget('Type')}</th>
                        <th>{iget('Status')}</th>
                        <th>{iget('Control')}</th>
                    </tr>
                    </thead>
                    <tbody refCollection="agents">
                        {agents.map(this.renderRow)}
                    </tbody>
                </Table>
            </Col>
        </Row>;
    }

    @autobind
    renderRow(agent, i) {
        let buttons;

        if (agent.status === 'registered') {
            const handler = () => this.props.approveAgent(agent.id);
            buttons = <Button
                onClick={handler}
                bsStyle="success"
                bsSize="xsmall">
                {iget('Approve')}
            </Button>;
        }

        return <tr className="c-agent-tr">
            <td>{i + 1}</td>
            <td>{agent.name}</td>
            <td>{agent.type}</td>
            <td>{agent.status}</td>
            <td>
                {buttons}
            </td>
        </tr>;

    }
}
