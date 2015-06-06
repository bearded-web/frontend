/**
 * Techs content store, store all targets.
 */

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import mergeToState from '../lib/mergeToState';


const initialState = fromJS({});

const api = {};

const handlers = {
    [C.TECHS_FETCH_SUCCESS](state, { results }) {
        return mergeToState(state, results);
    }
};

export default createStore(api, handlers, initialState);
