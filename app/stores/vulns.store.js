/**
 * vulns
 */

'use strict';

import { Map } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import mergeToState from '../lib/merge-to-state';

const initialState = Map();

const api = {
    asArray() {
        return this.getRawState().toList().toJS();
    },

    asList() {
        return this.getRawState().toList();
    }
};

const handlers = {
    [C.VULNS_FETCH_SUCCESS](state, { vulns }) {
        return mergeToState(state, vulns);
    }
};

export default createStore(api, handlers, initialState);

