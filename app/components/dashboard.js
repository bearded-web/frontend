import React, { PropTypes } from 'react/addons';
import flux from '../flux';
import { setCurrentProject } from '../actions/project.actions';
import authStore from '../stores/auth.store';
import setTitle from '../lib/set-title';
import { RouteHandler } from 'react-router';
import AppStore from '../stores/app.store';
import targetsStore from '../stores/targetsStore';

import ModalManager from './modal-manager';
import LockScreenContainer from './lock-screen-container';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import TopPanel from './TopPanel';

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

        const { router } = this.context;
        const targetId = router.getCurrentParams().targetId ||
            router.getCurrentQuery().target;

        const target = targetsStore.getRawState().get(targetId);

        const routes = this.context.router.getCurrentRoutes();
        const paramsJson = JSON.stringify(this.context.router.getCurrentParams());
        const name = routes[routes.length - 1].name;
        const key = name + paramsJson;

        return (
            <div className=" top-navigation">
                {lock && <LockScreenContainer/>}

                <div id="page-wrapper" className="page-wrapper gray-bg">
                    <TopPanel project={appStore.currentProject} target={target}/>

                    <div className="page-wrapper--content container-fluid">
                        <TransitionGroup component="div" transitionName="route-transition">
                            <RouteHandler key={key} routeQuery={routeQuery}/>
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
