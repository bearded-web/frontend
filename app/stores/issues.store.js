/**
 * Issues content store, store all issues.
 */

'use strict';

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import { pluck, zipObject } from 'lodash';

/**
 * Merge new issue into state. Add if new.
 * @param {Map} state Immutable state
 * @param {Object} issue issue
 * @return {Map} new state
 */
function mergeToState(state, issue) {
    return state.mergeDeepIn([issue.id], fromJS(issue));
}

// store issues as state = { issueId: issue, ... }
const initialState = fromJS({});

const api = {};

const handlers = {
    [C.ISSUES_FETCH_SUCCESS](state, issues) {
        return issues
            .reduce(mergeToState, state.asMutable())
            .asImmutable();
    }
};

export default createStore(api, handlers, initialState);
