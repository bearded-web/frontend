import React, { PropTypes } from 'react/addons';
import { Map } from 'immutable';

import ProjectInfo from '../project-info';
import NavListItem from '../../components/navigation-list-item';
import ProfileNavContainer from '../profile-nav-container';

var Router = require('react-router'),
    Link = require('react-router').Link,
    TargetNavLink = require('../target-nav-link'),
    Fa = require('../fa'),
    cx = React.addons.classSet;

class CName {
    constructor(componentName) {
        this.componentName = componentName;
        this.el = this.el.bind(this);
    }

    el(elementName) {
        return 'c-' + this.componentName + '--' + elementName;
    }
}

let { el } = new CName('left-panel');


var LeftPanel = React.createClass({
    mixins: [Router.State, FluxMixin],

    propTypes: {
        app: PropTypes.shape({
            currentProject: PropTypes.instanceOf(Map).isRequired,
            projects: PropTypes.instanceOf(Map).isRequired
        }).isRequired,
        targets: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        show: PropTypes.bool
    },

    contextTypes: {
        router: PropTypes.func
    },

    addTarget: function() {
        this.getFlux().actions.target.openAddTargetModal();
    },


    render() {
        let { app } = this.props,
            { currentProject } = app;

        if (!currentProject) return <div></div>;

        let $targets = currentProject.get('targets');


        var targetsStore = this.props.targets,
            { project } = targetsStore;

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
                        <ProfileNavContainer/>
                        <br/>
                        <ProjectInfo projects={app.projects} currentProject={currentProject}/>
                    </li>

                    <li className={this.context.router.isActive('overview') ? 'active' : ''}>
                        <Link to="/">
                            <span className="nav-label">
                                <Fa icon="th-large" />
                                Overview
                            </span>
                        </Link>
                    </li>

                    <li className="c-left-panel--subheader">
                        <a onClick={this.addTarget} className={el('add-link')}>
                            <Fa icon="plus"/>
                            {iget('add')}
                        </a>
                        {iget('Targets')}
                    </li>

                    {!$targets || !$targets.size ? <li className="c-left-panel--button">
                        <a onClick={this.addTarget}>
                            <Fa icon="plus"/>
                            {iget('Add target')}
                        </a>
                    </li> : ''}

                    {$targets && $targets.toArray().map(function(target, i) {
                        return (
                            <TargetNavLink key={target.id || i} target={target} />
                        );
                    })}


                    <li className="c-left-panel--subheader">
                        {iget('Settings')}
                    </li>

                    <li className={this.context.router.isActive('agents') ? 'active' : ''}>
                        <Link to="agents">
                            <span className="nav-label">
                                <Fa icon="cube" />
                                Agents
                            </span>
                        </Link>
                    </li>

                    <NavListItem route="plans">
                        <span className="nav-label">
                            <Fa icon="tasks" />
                            Plans
                        </span>
                    </NavListItem>
                </ul>
                <br/>
                <br/>
                <br/>
            </nav>
        );
    }
});

module.exports = LeftPanel;
