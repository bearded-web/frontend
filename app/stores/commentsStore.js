/**
 * Store handle all comments
 */

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import mergeToState from '../lib/mergeToState';

const initialState = fromJS({});

const api = {};

const handlers = {
    [C.COMMENTS_FETCH_SUCCESS](state, comments) {
        return mergeToState(state, comments);
    }
};

export default createStore(api, handlers, initialState);

