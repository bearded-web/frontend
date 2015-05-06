'use strict';

import React, { PropTypes } from 'react/addons';
import flux from '../flux';
import { setCurrentProject } from '../actions/project.actions';
import authStore from '../stores/auth.store';
import setTitle from '../lib/set-title';
import Router, { RouteHandler } from 'react-router';
import AppStore from '../stores/app.store';
import LeftPanel from './left-panel';
import LeftPanelCover from './left-panel-cover';

import ModalManager from './modal-manager';
import LockScreenContainer from './lock-screen-container';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

var Dashboard = React.createClass({
    mixins: [
        FluxMixin,
        flux.createStoreWatchMixin('Store')
    ],

    contextTypes: {
        router: React.PropTypes.func
    },

    propTypes: {
        routeQuery: PropTypes.object,
        app: PropTypes.object,
        targets: PropTypes.array
    },

    statics: {
        willTransitionTo: function(transition, a, c, callback) {
            let app = flux.store('AppStore'),
                initInterval;

            //TODO refactor
            initInterval = setInterval(function() {
                if (!app.inited) return;

                clearInterval(initInterval);

                if (!app.isLogedIn) {
                    callback();
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

    getInitialState() {
        return this.getState();
    },

    componentWillMount() {
        setTitle(iget('Dashboard'));

        if (!authStore.getState().user) {
            this.context.router.transitionTo('login');
        }
    },

    componentDidMount() {
        authStore.onChange(this.onStoreChange);
    },

    componentWillUnmount() {
        authStore.offChange(this.onStoreChange);
    },

    onStoreChange() {
        this.setState(this.getState);
    },

    getState() {
        const { user, isLogedIn } = authStore.getState();

        return {
            lock: user && !isLogedIn,
            isAdmin: authStore.isAdmin()
        };
    },

    getStateFromFlux() {
        return {
            app: flux.store('Store').getState()
        };
    },

    render() {
        const { routeQuery } = this.props;
        const { lock, isAdmin } = this.state;
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

        const routes = this.context.router.getCurrentRoutes();
        const name = routes[routes.length - 1].name;

        return (
            <div className="c-dashboard">
                {lock && <LockScreenContainer/>}

                <LeftPanel app={appStore}
                           targets={targets}
                           isAdmin={isAdmin}
                           show={app.leftPanelVisible}
                           user={app.user}/>

                <div className="page-wrapper gray-bg">
                    <div className="page-wrapper--content container-fluid">
                        <TransitionGroup component="div" transitionName="route-transition">
                            <RouteHandler key={name} routeQuery={routeQuery}/>
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
