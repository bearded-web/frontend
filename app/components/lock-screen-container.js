/**
Container for lock screen.
Use authStore
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import authStore from '../stores/auth.store';

import LockScreen from './lock-screen';


export default class LockScreenContainer extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onStoreChange',
            'getState'
        ]);

        this.state = this.getState();

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    componentDidMount() {
        authStore.onChange(this.onStoreChange);
    }

    componentWillUnmount() {
        authStore.offChange(this.onStoreChange);
    }

    onStoreChange() {
        this.setState(this.getState());
    }

    getState() {
        return authStore.getState();
    }

    render() {
        const { user, loginError } = this.state;

        return <LockScreen user={user} loginError={loginError}/>;
    }
}
