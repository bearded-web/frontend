import React, { PropTypes } from 'react/addons';
import flux from '../flux';
import { setCurrentProject } from '../mutators/projectsMutators';
import authStore from '../stores/auth.store';
import setTitle from '../lib/set-title';
import { RouteHandler } from 'react-router';
import { FluxMixin } from 'fluxxor';


import ModalManager from './modal-manager';
import LockScreenContainer from './lock-screen-container';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import TopPanel from './TopPanel';

const Dashboard = React.createClass({
    mixins: [
        FluxMixin(React),
        createStoreWatchMixin('Store')
    ],

    contextTypes: {
        router: React.PropTypes.func,
        tree: PropTypes.object,
        api: PropTypes.object
    },

    propTypes: {
        routeQuery: PropTypes.object,
        params: PropTypes.object,
        query: PropTypes.object,
        app: PropTypes.object,
        targets: PropTypes.array
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
        const targetId = this.props.params.targetId ||
            this.props.query.target;

        if (targetId) {
            const target = this.context.tree.get('targets', targetId);
            if (target) {
                if (target.project !== this.context.tree.get('currentProjectId')) {
                    setCurrentProject({
                        tree: this.context.tree,
                        api: this.context.api,
                        router: this.context.router
                    }, target.project);
                }
            }
        }
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

        const target = this.context.tree.get('targets', targetId);

        const routes = this.context.router.getCurrentRoutes();
        const paramsJson = JSON.stringify(this.context.router.getCurrentParams());
        const name = routes[routes.length - 1].name;
        const key = name + paramsJson;

        return (
            <div className=" top-navigation">
                {lock && <LockScreenContainer/>}

                <div id="page-wrapper" className="page-wrapper gray-bg">
                    <TopPanel targetId={targetId}/>

                    <div className="page-wrapper--content container-fluid">
                        <TransitionGroup component="div" transitionName="route-transition">
                            <RouteHandler key={key} routeQuery={routeQuery}/>
                        </TransitionGroup>
                    </div>
                </div>
                {leftPanelCover}

                <ModalManager modal={appStore.modal}/>
            </div>
        );
    }
});

module.exports = Dashboard;
