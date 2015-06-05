/**
 * Store handle all users data
 */

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import mergeToState from '../lib/mergeToState';
import { pickItemsByIds } from '../lib/storeUtils';

const initialState = fromJS({});

const api = {
    getUsers(ids) {
        return pickItemsByIds(this.getRawState(), ids);
    }
};

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
    [C.USERS_FETCH_SUCCESS](state, { results }) {
        return mergeToState(state, results);
    },
    [C.USERS_PAGE_FETCH_SUCCESS](state, { results }) {
        return mergeToState(state, results);
    }
};

export default createStore(api, handlers, initialState);

