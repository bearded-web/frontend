/**
 * Store handle all users data
 */

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import mergeToState from '../lib/mergeToState';

const initialState = fromJS({});

const api = {};

const handlers = {
    [C.USER_CREATE_START](state, { user, randomId }) {
        return state.set(randomId, fromJS(user));
    },
    [C.USER_CREATE_SUCCESS](state, { user, randomId }) {
        return mergeToState(state, [user])
            .delete(randomId);
    },
    [C.USER_CREATE_FAIL](state, { randomId }) {
        return state.delete(randomId);
    },
    [C.USERS_FETCH_SUCCESS](state, users) {
        return mergeToState(state, users);
    }
};

export default createStore(api, handlers, initialState);

