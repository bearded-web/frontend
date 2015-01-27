var Link = require('react-router').Link,
    Router = require('react-router'),
    Fa = require('./fa');

module.exports = React.createClass({
    mixins: [Router.State],

    render: function() {
        var target = this.props.target,
            targetId = target.id,
            isActiveLink = this.isActive('target', { targetId });


        return (
            <li className={isActiveLink ? 'active' : ''}>
                <Link to="target" params={{ targetId: targetId }}>
                    <Fa icon="globe" />
                    <span className="nav-label">
                        {target.web.domain}
                    </span>
                </Link>
            </li>
        );
    }
});
