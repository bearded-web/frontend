/**
 * Issues content store, store all issues.
 */

import { fromJS, OrderedMap } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import { isArray } from 'lodash';

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

const api = {
    /**
     * Return all issues by ids
     *
     * Get ids of issues.
     * Returns OrderedMap for this ids
     */
    getIssues(...ids) {
        let allIssues = this.getState();

        let issues = new OrderedMap();

        issues = issues.asMutable();

        ids.forEach(function(id) {
            issues.set(id, allIssues[id]);
        });

        return issues.asImmutable();
    }
};

const handlers = {
    [C.ISSUES_FETCH_SUCCESS](state, issues) {
        if (issues && isArray(issues.results)) {
            issues = issues.results;
        }

        return issues
            .reduce(mergeToState, state.asMutable())
            .asImmutable();
    },

    [C.ISSUE_UPDATE_START](state, update) {
        return state.mergeIn([update.id], update);
    },

    //TODO tests
    [C.ISSUE_UPDATE_FAIL](state, update) {
        return state.mergeIn([update.id], update);
    },

    [C.ISSUE_CREATE_SUCCESS](state, { issue }) {
        return state.set(issue.id, fromJS(issue));
    }
};

export default createStore(api, handlers, initialState);
