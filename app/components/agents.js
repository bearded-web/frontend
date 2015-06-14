import { FluxMixin } from 'fluxxor';
import setTitle from '../lib/set-title';

import React from 'react';
import Router from 'react-router';
import flux from '../flux';

import { Row, Col, Table } from 'react-bootstrap';
import AgentTr from './agent-tr';
import Header from './header';

const Agents = React.createClass({
    mixins: [
        Router.Navigation,
        FluxMixin(React),
        createStoreWatchMixin('AgentsStore')
    ],

    statics: {
        willTransitionTo: function() {
            flux.actions.agent.fetch();
        }
    },

    componentDidMount() {
        setTitle(iget('Agents'));
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
                                    <AgentTr key={i} agent={agent} number={i + 1}/>
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
