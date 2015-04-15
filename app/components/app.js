'use strict';

import { createClass} from 'react/addons';
import { FluxMixin } from 'fluxxor';
import { State, RouteHandler } from 'react-router';
import authStore from '../stores/auth.store';

import LoginOverlay from './login-overlay';
import AppLoader from './app-loader/index';
import Toast from './toast';
import Dashboard from './dashboard';
import LockScreenContainer from './lock-screen-container';


export default createClass({
    name: 'App',

    mixins: [
        FluxMixin(React),
        createStoreWatchMixin('AppStore', 'TargetsStore'),
        State
    ],

    getInitialState() {
        return this.getState();
    },

    componentDidMount() {
        authStore.onChange(this.onStoreChange);
    },


    componentWillUnmount() {
        authStore.offChange(this.onStoreChange);
    },

    onStoreChange() {
        this.setState(this.getState());
    },

    getState() {
        return authStore.getState();
    },

    getStateFromFlux() {
        return {
            app: this.getFlux().store('AppStore'),
            targets: this.getFlux().store('TargetsStore')
        };
    },

    render() {
        const { app, isLogedIn, user } = this.state;
        const { routeQuery } = this.props;

        if (!app.inited) {
            return <AppLoader/>;
        }

        if (!isLogedIn && !user) {
            return (
                <LoginOverlay/>
            );
        }

        return <div>
            {(user && !isLogedIn) ? <LockScreenContainer/> : ''}
            <RouteHandler routeQuery={routeQuery}/>
            <Toast/>
        </div>;
    }
});
