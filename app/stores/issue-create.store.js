/**
 * issueCreate
 */

'use strict';

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';

const initialState = fromJS({
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
    }
};

export default createStore(api, handlers, initialState);

