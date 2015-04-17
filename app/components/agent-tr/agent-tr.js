'use strict';
var React = require('react');

var { Button } = require('react-bootstrap');

var AgentTr = React.createClass({
    mixins: [
        FluxMixin
    ],

    propTypes: {
        number: React.PropTypes.number,
        agent: React.PropTypes.object.isRequired
    },

    onApproveClick: function(e) {
        e.preventDefault();

        this.getFlux().actions.agent.approve(this.props.agent.id);
    },

    render: function() {
        var props = this.props,
            agent = props.agent,
            buttons;

        if (agent.status === 'registered') {
            buttons = (
                <Button onClick={this.onApproveClick} bsStyle="success" bsSize="xsmall">
                    {iget('Approve')}
                </Button>
            );
        }

        return (
            <tr className="c-agent-tr">
                <td>{props.number}</td>
                <td>{agent.name}</td>
                <td>{agent.type}</td>
                <td>{agent.status}</td>
                <td>
                    {buttons}
                </td>
            </tr>
        );
    }
});

module.exports = AgentTr;
