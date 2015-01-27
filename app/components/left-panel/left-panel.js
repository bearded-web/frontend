var Router = require('react-router'),
    Link = require('react-router').Link,
    TargetNavLink = require('../target-nav-link'),
    Fa = require('../fa'),
    cx = React.addons.classSet;


var LeftPanel = React.createClass({
    mixins: [Router.State, FluxMixin],

    propTypes: {
        targets: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired,
        show: React.PropTypes.bool
    },

    addTarget: function() {
        this.getFlux().actions.target.openAddTargetModal();
    },


    render: function() {
        var targetsStore = this.props.targets,
            { project, targets } = targetsStore;

        var addingStateShow;

        if (targetsStore.targetAddInProcess) {
            addingStateShow = (
                <li className="text-center">Adding target...</li>
            );
        }

        var className = 'c-left-panel sidebar';
        if (this.props.show) {
            className += ' c-left-panel--opened';
        }
        var classes = cx({
            'c-left-panel sidebar': true,
            'c-left-panel--opened': this.props.show,
            'navbar-default': true
        });

        return (
            <nav role="navigation" className={classes}>
                <ul className="nav">
                    <li className="nav-header">
                        <div className="logo-element">Barbudo</div>
                    </li>

                    <li className={this.isActive('overview') ? 'active' : ''}>
                        <Link to="/">
                            <Fa icon="th-large" />
                            <span className="nav-label">
                                Overview
                            </span>
                        </Link>
                    </li>

                    <li className="c-left-panel--subheader">
                        {iget('Targets')}
                    </li>

                    {targets.map(function(target) {
                        return (
                            <TargetNavLink  key={target.id} target={target} />
                        );
                    })}

                    <li className="c-left-panel--button">
                        <a onClick={this.addTarget}>
                            <Fa icon="plus" size="lg" />
                        </a>
                    </li>


                    <li className="c-left-panel--subheader">
                        {iget('Settings')}
                    </li>

                    <li className={this.isActive('agents') ? 'active' : ''}>
                        <Link to="agents">
                            <Fa icon="cube" />
                            <span className="nav-label">
                                Agents
                            </span>
                        </Link>
                    </li>
                </ul>
                <br/>
                <br/>
                <br/>
            </nav>
        );
    }
});

module.exports = LeftPanel;
