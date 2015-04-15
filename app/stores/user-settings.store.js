/**
 * Store handle all user auth
 */

'use strict';

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';

const initialState = fromJS({
    password: '',
    oldPassword: '',
    loading: false,
    error: ''
});

const api = {};

const handlers = {
    [C.US_PASSWORD_FIELD_CHANGE](state, { password }) {
        return state.set('password', password);
    },
    [C.US_OLD_PASSWORD_FIELD_CHANGE](state, { oldPassword }) {
        return state.set('oldPassword', oldPassword);
    },
    [C.US_PASSWORD_CHANGE_SUCCESS](state) {
        return state.merge({
            password: '',
            oldPassword: '',
            loading: false,
            error: ''
        });
    },
    [C.US_PASSWORD_CHANGE_START](state) {
        return state.set('loading', true);
    },

    //TODO tests
    [C.US_PASSWORD_CHANGE_FAIL](state, { message }) {
        return state
            .set('loading', false)
            .set('error', message);
    }
};

export default createStore(api, handlers, initialState);

