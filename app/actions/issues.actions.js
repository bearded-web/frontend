'use strict';

import { issues } from '../lib/api3';
import { extractor } from '../lib/helpers';
import { dispatch } from '../lib/disp';
import C from '../constants';
import { cloneDeep } from 'lodash';

const dispatchFetch = res => dispatch(C.ISSUES_FETCH_SUCCESS, res);

/**
 * Load issues fro issues page
 * @param {String} [target] target id
 */
export function loadForTarget({ target }) {
    issues.list({ target })
        .then(dispatchFetch);
}

/**
 * Fetch one issue
 * @param {String} id issue id
 */
export function fetchOne(id) {
    const wrap = issue => {
        return { results: [issue] };
    };

    issues.get(id)
        .then(wrap)
        .then(dispatchFetch);
}

/**
 * Update issues list filter
 * @param {Map} filter new filter
 */
export function updateFilter(filter) {
    dispatch(C.ISSUES_UPDATE_FILTER, filter);
}

/**
 * Update issues list sort filed
 * @param {String} sortBy
 */
export function updateSort(sortBy) {
    dispatch(C.ISSUES_UPDATE_SORT, sortBy);
}


//TODO delete, used for dev
function addFakeIssueToData(data) {
    let i = cloneDeep(data.results[0]);
    i.id = Math.random();
    i.summary += Math.random();
    i.severity = Math.random() > 0.5 ? 'high' : 'low';
    i.created = require('moment')()
        .subtract(Math.random() * 1000, 'day')
        .format();
    data.results.push(i);
    return data;
}
