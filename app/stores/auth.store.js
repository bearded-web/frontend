/**
 * Store handle all user auth
 */

'use strict';

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';

const initialState = fromJS({
    isLogedIn: false,
    user: null,
    loginError: '',

    loading: false,
    resetPasswordError: ''
});

const api = {};

const handlers = {
    [C.AUTH_UNLOCK_START](state) {
        return state
            .set('loading', true);
    },

    [C.AUTH_UNLOCK_SUCCESS](state) {
        return state
            .set('isLogedIn', true)
            .set('loading', false);
    },

    [C.USER_LOGIN_START](state) {
        return state.set('loading', true);
    },

    [C.USER_LOGIN_SUCCESS](state, user) {
        return state.merge(fromJS({
            user,
            loginError: '',
            isLogedIn: true
        }));
    },

    [C.USER_LOGOUT_SUCCESS](state) {
        return state.merge(fromJS({
            loginError: '',
            user: null
        }));
    },

    [C.USER_LOST_AUTH](state) {
        return state.merge(fromJS({
            isLogedIn: false
        }));
    },

    [C.USER_LOGIN_FAIL](state, loginError) {
        return state.merge(fromJS({
            loginError,
            loading: false
        }));
    },

    [C.AUTH_RESET_PASSWORD_START](state) {
        return state.set('loading', true);
    },

    [C.AUTH_RESET_PASSWORD_SUCCESS](state) {
        return state.set('loading', false);
    },

    [C.AUTH_RESET_PASSWORD_FAIL](state, { message }) {
        message = message || iget('Server error');

        return state
            .set('resetPasswordError', message)
            .set('loading', false);
    },

    [C.AUTH_NEW_PASSWORD_START](state) {
        return state.set('loading', true);
    },
    [C.AUTH_NEW_PASSWORD_SUCCESS](state) {
        return state.set('loading', false);
    },
    [C.AUTH_NEW_PASSWORD_FAIL](state, { message }) {
        message = message || iget('Server error');

        return state
            .set('resetPasswordError', message)
            .set('loading', false);
    }
};

export default createStore(api, handlers, initialState);

