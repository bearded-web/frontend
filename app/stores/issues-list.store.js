/**
 * Issues list store, store issues for issues list page.
 */

'use strict';

import { fromJS, List, OrderedMap } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import { pluck } from 'lodash';
import issuesStore from './issues.store';
import { weight, HIGH, MEDIUM, LOW } from '../lib/severities';
import moment from 'moment';

const initialState = fromJS({
    targetId: null, // current target list
    filter: {
        severity: 'all',
        type: 'all',
        search: ''
    },
    sortBy: 'severity',
    issues: [], // issues ids
    loading: false
});

const api = {
    /**
     * Return issues with current filter and sort
     * @returns {OrderedMap} map with issues
     */
    getIssues() {
        const state = this.getState();
        const ids = state.issues.toArray();

        let issues = issuesStore.getIssues(...ids);

        const filter = state.filter.toObject();

        if (filter.severity !== 'all') {
            const severityFilter = i => {
                return i.get('severity') === filter.severity;
            };
            issues = issues.filter(severityFilter);
        }

        if (filter.search) {
            const searchFilter = i => {
                return i
                    .get('summary')
                    .toLowerCase()
                    .indexOf(filter.search.toLowerCase()) > -1;
            };

            issues = issues.filter(searchFilter);
        }

        // sort
        const comparator = buildSortComparator(state.sortBy);
        issues = issues.sort(comparator);

        return issues;
    }
};

const handlers = {
    [C.ISSUES_FETCH_START](state, payload) {
        return state
            .set('issues', List())
            .set('targetId', payload.target)
            .set('loading', true);
    },

    [C.ISSUES_FETCH_SUCCESS](state, data) {
        const issues = data.results;
        const target = state.get('targetId');

        //TODO use api token or api query for check request
        if (target && issues.length && issues[0].target !== target) {
            return state;
        }

        return state
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
        const toMoment = a => moment(a.get('created'));

        return (a, b) => toMoment(a).isBefore(toMoment(b));
    }

    return (a, b) => weight(a.get('severity')) < weight(b.get('severity'));
}

//endregion private