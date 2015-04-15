import { Map } from 'immutable';

var React = require('react'),
    { PropTypes } = React,
    Router = require('react-router'),
    actions = require('../../actions/app.actions'),
    _ = require('lodash');

var Link = require('react-router').Link,
    { Label } = require('react-bootstrap'),
    Fa = require('../fa');

module.exports = React.createClass({
    mixins: [Router.State],

    propTypes: {
        target: PropTypes.instanceOf(Map).isRequired
    },

    onClick: function() {
        actions.toggleLeftPanel();
    },

    render: function() {
        var target = this.props.target.toJS(),
            targetId = target.id,
            isActiveLink = this.isActiveState(),
            isHttps = false,
            domain = target.web.domain;

        if (_.startsWith(domain, 'http://')) {
            domain = domain.slice(7);
        }

        if (_.startsWith(domain, 'https://')) {
            domain = domain.slice(8);
            isHttps = true;
        }

        return (
            <li className={isActiveLink ? 'active' : ''}>
                <Link onClick={this.onClick} to="target" params={{ targetId: targetId }} title={target.web.domain}>
                    {this.renderIssuesLabel()}
                    <span className="nav-label">
                        <Fa icon={isHttps ? 'lock' : 'globe'}/>
                        {domain}
                    </span>
                </Link>
            </li>
        );
    },


    renderIssuesLabel: function() {
        var { issues } = this.props.target.toJS().summaryReport || { issues: {} },
            count = 0,
            labelStyle;

        if (issues.low) {
            count = issues.low;
            labelStyle = 'info';
        }

        if (issues.medium) {
            count = issues.medium;
            labelStyle = 'warning';
        }

        if (issues.high) {
            count = issues.high;
            labelStyle = 'danger';
        }

        if (!count) return '';

        const style = {
            float: 'right',
            marginLeft: '0.3rem'
        };

        return <Label bsStyle={labelStyle} style={style}>{count}</Label>;
    },

    isActiveState: function() {
        var targetId = this.props.target.toJS().id;

        return this.isActive('target', { targetId }) ||
            this.isActive('report') && this.getQuery().target === targetId;
    }
});
