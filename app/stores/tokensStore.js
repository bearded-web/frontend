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
    [C.TOKENS_FETCH_SUCCESS](state, { results }) {
        return mergeToState(state, results);
    },

    [C.TOKEN_CREATE_SUCCESS](state, { token }) {
        return mergeToState(state, [token]);
    },

    [C.TOKEN_REMOVE_SUCCESS](state, { tokenId }) {
        return state.delete(tokenId);
    }
};

export default createStore(api, handlers, initialState);

