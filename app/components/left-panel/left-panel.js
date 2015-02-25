import React, { PropTypes } from 'react/addons';
import { Map } from 'immutable';

import ProjectInfo from '../project-info';

var Router = require('react-router'),
    Link = require('react-router').Link,
    TargetNavLink = require('../target-nav-link'),
    Fa = require('../fa'),
    cx = React.addons.classSet;



var LeftPanel = React.createClass({
    mixins: [Router.State, FluxMixin],

    propTypes: {
        app: PropTypes.shape({
            currentProject: PropTypes.instanceOf(Map).isRequired,
            projects: PropTypes.instanceOf(Map).isRequired,
        }).isRequired,
        targets: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        show: PropTypes.bool
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

                        <ProjectInfo projects={app.projects} currentProject={currentProject}/>
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

                    {$targets && $targets.toArray().map(function(target) {
                        return (
                            <TargetNavLink  key={target.id} target={target} />
                        );
                    })}

                    <li className="c-left-panel--button">
                        <a onClick={this.addTarget}>
                            <Fa icon="plus"/>
                            {iget('Add target')}
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
