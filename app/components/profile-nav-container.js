'use strict';

import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import authStore from '../stores/auth.store';
import { bindAll } from 'lodash';

import ProfileNav from './profile-nav';


export default class ProfileNavContainer extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onStoreChange'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
        this.state = this.getState();
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
        const { user } = this.state;

        return <ProfileNav user={user}/>;
    }
}

ProfileNavContainer.propTypes = {};

