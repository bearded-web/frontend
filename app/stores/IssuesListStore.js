/**
 * Issues list store, store issues for issues list page.
 */

import { fromJS, List } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import { pluck } from 'lodash';
import issuesStore from './issues.store';
import { weight, ERROR } from '../lib/severities';


const initialState = fromJS({
    count: 0,
    pageSize: 30,
    page: 1,
    targetId: null, // current target list
    filter: {
        severity: null,
        vulnType: null,
        search: '',
        false: null,
        confirmed: null,
        muted: null,
        resolved: null
    },
    sortBy: 'severity',
    issues: [], // issues ids
    loading: false
});

const api = {};

const handlers = {
    [C.ISSUES_FETCH_START](state, { target, page }) {
        return state
            .set('issues', List())
            .set('page', page)
            .set('targetId', target)
            .set('loading', true);
    },

    [C.ISSUES_FETCH_SUCCESS](state, { results, count }) {
        const issues = results;
        const target = state.get('targetId');

        //TODO use api token or api query for check request
        if (target && issues.length && issues[0].target !== target) {
            return state;
        }

        return state
            .set('count', count)
            .set('issues', fromJS(pluck(issues, 'id')))
            .set('loading', false);
    },

    [C.ISSUES_UPDATE_FILTER](state, filter) {
        return state.set('filter', filter);
    },

    [C.ISSUES_UPDATE_SORT](state, sortBy) {
        return state.set('sortBy', sortBy);
    }
};

export default createStore(api, handlers, initialState);

//region private

function buildSortComparator(sortBy) {
    if (sortBy === 'created') {
        const toTime = a => (new Date(a.get('created'))).getTime();

        return (a, b) => toTime(b) - toTime(a);
    }

    return (a, b) => weight(a.get('severity')) < weight(b.get('severity'));
}

//endregion private
