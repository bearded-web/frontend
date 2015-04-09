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
    loginError: ''
});

const api = {};

const handlers = {
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
            loginError
        }));
    }
};

export default createStore(api, handlers, initialState);

