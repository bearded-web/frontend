var React = require('react'),
    Router = require('react-router'),
    flux = require('../../flux');

var { Row, Col, Table } = require('react-bootstrap'),
    AgentTr = require('../agent-tr'),
    Header = require('../header');

var Agents = React.createClass({
    mixins: [
        Router.Navigation,
        FluxMixin,
        createStoreWatchMixin('AgentsStore')
    ],

    statics: {
        willTransitionTo: function() {
            flux.actions.agent.fetch();
        }
    },

    getStateFromFlux: function() {
        return this.getFlux().store('AgentsStore').getState();
    },

    render: function() {
        var agents = this.state.agents;

        return (
            <div className="c-agents">
                <Header>
                    <Col xs={12}>
                        <h2>
                                {iget('Agents list')}
                        </h2>
                    </Col>
                </Header>
                <br/>
                <Row>
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
                            <tbody>
                                {agents.map(function(agent, i) {
                                    return (
                                        <AgentTr key={i} agent={agent} number={i+1} />
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
});

module.exports = Agents;
