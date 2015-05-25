/**
 * Projects content store, store all projects.
 */

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import mergeToState from '../lib/mergeToState';


const initialState = fromJS({});

const api = {};

const handlers = {
    [C.PROJECTS_FETCH_SUCCESS](state, projects) {
        return mergeToState(state, projects);
    }
};

export default createStore(api, handlers, initialState);
