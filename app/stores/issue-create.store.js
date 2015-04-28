/**
 * issueCreate
 */

'use strict';

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';

const initialState = fromJS({
    loading: false,
    error: '',
    issue: {
        summary: '',
        desc: '',
        references: [],
        vulnType: 0,
        confirmed: true,
        false: false,
        muted: false,
        resolved: false
    }
});

const api = {};

const handlers = {
    [C.ISSUE_EDIT_CHANGE](state, { issue }) {
        return state.mergeIn(['issue'], issue);
    },
    [C.ISSUE_CREATE_START](state) {
        return state.set('loading', true);
    },
    [C.ISSUE_CREATE_SUCCESS](state) {
        return initialState;
    },
    [C.ISSUE_CREATE_FAIL](state, { message }) {
        return state.merge({
            loading: false,
            error: message
        });
    }
};

export default createStore(api, handlers, initialState);

