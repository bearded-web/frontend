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
    [C.USERS_FETCH_SUCCESS](state, users) {
        return mergeToState(state, users);
    }
};

export default createStore(api, handlers, initialState);

