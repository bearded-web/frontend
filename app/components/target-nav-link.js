var Router = require('react-router'),
    _ = require('lodash');

var Link = require('react-router').Link,
    Fa = require('./fa');

module.exports = React.createClass({
    mixins: [Router.State],

    render: function() {
        var target = this.props.target,
            targetId = target.id,
            isActiveLink = this.isActive('target', { targetId }),
            isHttps = false,
            domain = target.web.domain;


        //TODO replace with _.startWith
        if (_.startsWith(domain, 'http://')) {
            domain = domain.slice(7);
        }

        if (_.startsWith(domain, 'https://')) {
            domain = domain.slice(8);
            isHttps = true;
        }

        return (
            <li className={isActiveLink ? 'active' : ''}>
                <Link to="target" params={{ targetId: targetId }} title={target.web.domain}>
                    <Fa icon={isHttps ? 'lock' : 'globe'} />
                    <span className="nav-label">
                        {domain}
                    </span>
                </Link>
            </li>
        );
    }
});
