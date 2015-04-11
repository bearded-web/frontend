'use strict';

import flux from '../flux';
import { setCurrentProject } from '../actions/project.actions';

import ModalManager from './modal-manager';

var React = require('react/addons'),
    Router = require('react-router'),
    AppStore = require('../stores/app.store'),
    RouteHandler = Router.RouteHandler,
    AddTargetModal = require('./add-target-modal'),
    LeftPanel = require('./left-panel'),
    Navbar = require('./navbar'),
    LeftPanelCover = require('./left-panel-cover');

import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

var Dashboard = React.createClass({
    mixins: [
        FluxMixin,
        flux.createStoreWatchMixin('Store')
    ],

    contextTypes: {
        router: React.PropTypes.func
    },


    statics: {
        willTransitionTo: function(transition, a, c, callback) {
            let app = flux.store('AppStore'),
                initInterval;

            initInterval = setInterval(function() {
                if (!app.inited) return;

                clearInterval(initInterval);

                if (!app.isLogedIn) {
                    callback();
                    transition.redirect('/');
                    flux.actions.app.showLogin();
                }
                else {
                    let interval = setInterval(function() {

                        let $currentProject = flux.store('Store')
                            .getState().currentProject;

                        if ($currentProject) {
                            setCurrentProject($currentProject.get('id'), true);
                            clearInterval(interval);
                            callback();
                        }
                    });
                }
            }, 30);
        }
    },

    getStateFromFlux() {
        return {
            app: flux.store('Store').getState()
        };
    },

    render() {
        let appStore = this.state.app;

        var app = this.props.app,
            targets = this.props.targets,
            leftPanelCover,
            targetModal;

        app = this.getFlux().store('AppStore');
        targets = this.getFlux().store('TargetsStore');

        if (app.leftPanelVisible) {
            leftPanelCover = <LeftPanelCover />;
        }

        if (targets.modalIsVisible) {
            targetModal = <AddTargetModal targetsStore={targets}/>;
        }

        const routes = this.context.router.getCurrentRoutes();
        const name = routes[routes.length - 1].name;

        return (
            <div className="c-dashboard">
                <LeftPanel app={appStore} targets={targets} show={app.leftPanelVisible} user={app.user}/>

                <div className="page-wrapper gray-bg">
                    <div className="container-fluid">
                        <Navbar user={app.user}/>
                    </div>
                    <div className="page-wrapper--content container-fluid">
                        <TransitionGroup component="div" transitionName="route-transition">
                            <RouteHandler key={name}/>
                        </TransitionGroup>
                    </div>
                </div>
                {leftPanelCover}
                {targetModal}

                <ModalManager modal={appStore.modal}/>
            </div>
        );
    }
});

module.exports = Dashboard;
