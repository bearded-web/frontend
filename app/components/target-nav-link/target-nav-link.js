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
        target: PropTypes.shape({
            web: PropTypes.object.isRequired,
            summaryReport: PropTypes.shape({
                issues: PropTypes.object.isRequired
            }).isRequired
        }).isRequired
    },

    onClick: function() {
        actions.toggleLeftPanel();
    },

    render: function() {
        var target = this.props.target,
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
                    <Fa icon={isHttps ? 'lock' : 'globe'} />
                    <span className="nav-label">
                        {domain}
                    </span>
                    {this.renderIssuesLabel()}
                </Link>
            </li>
        );
    },


    renderIssuesLabel: function() {
        var { issues } = this.props.target.summaryReport || { issues: {} },
            count = 0,
            labelStyle;

        if (issues.info) {
            count = issues.info;
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

        return <Label bsStyle={labelStyle} className="pull-right">{count}</Label>;
    },

    isActiveState: function() {
        var targetId = this.props.target.id;

        return this.isActive('target', { targetId }) ||
            this.isActive('report') && this.getQuery().target === targetId;
    },
});
