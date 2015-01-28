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
            domain = target.web.domain;


        //TODO replace with _.startWith
        if (domain.indexOf('http://') === 0) {
            domain = domain.slice(7);
        }

        if (domain.indexOf('https://') === 0) {
            domain = domain.slice(8);
        }

        return (
            <li className={isActiveLink ? 'active' : ''}>
                <Link to="target" params={{ targetId: targetId }} title={target.web.domain}>
                    <Fa icon="globe" />
                    <span className="nav-label">
                        {domain}
                    </span>
                </Link>
            </li>
        );
    }
});
