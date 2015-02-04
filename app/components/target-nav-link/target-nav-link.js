var React = require('react'),
    { PropTypes } = React,
    Router = require('react-router'),
    actions = require('../../actions/app.actions'),
    _ = require('lodash');

var Link = require('react-router').Link,
    Fa = require('../fa');

module.exports = React.createClass({
    mixins: [Router.State],

    propTypes: {
        target: PropTypes.shape({
            web: PropTypes.object.isRequired
        }).isRequired
    },

    onClick: function() {
        actions.toggleLeftPanel();
    },

    render: function() {
        var target = this.props.target,
            targetId = target.id,
            isActiveLink = this.isActive('target', { targetId }),
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
                </Link>
            </li>
        );
    }
});
