/**
 * targetCreate
 */

'use strict';

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';

const initialState = fromJS({
    loading: false,
    error: ''
});

const api = {};

const handlers = {
    [C.ADD_TARGET](state) {
        return state.set('loading', true);
    },
    [C.ADD_TARGET_FAIL](state, { message }) {
        return state.merge({
            loading: false,
            error: message
        });
    },
    [C.ADD_TARGET_SUCCESS](state, { target }) {
        return state.merge({
            loading: false,
            error: ''
        });
    }
};

export default createStore(api, handlers, initialState);

