'use strict';

import { issues } from '../lib/api3';
import { extractor } from '../lib/helpers';
import { dispatch } from '../lib/disp';
import C from '../constants';
import { cloneDeep } from 'lodash';
import { HIGH, MEDIUM, LOW } from '../lib/severities';

const dispatchFetch = res => dispatch(C.ISSUES_FETCH_SUCCESS, res);

/**
 * Load issues fro issues page
 * @param {String} [target] target id
 */
export function loadForTarget({ target }) {
    dispatch(C.ISSUES_FETCH_START, { target });
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


/**
 * Toggle issue status
 * @param {Model} issue issue
 * @param {String} statusName status name (confirmed, false, muted, resolved)
 */
export function toggleStatus(issue, statusName) {
    const issueId = issue.get('id');
    const status = !issue.get(statusName);

    dispatch(C.ISSUE_UPDATE_START, {
        id: issueId,
        [statusName]: status
    });

    issue = issue.set(statusName, status);
    issue = issue.toJS();
    delete issue.vector;
    delete issue.references;
    delete issue.extras;

    issues
        .update({
            issueId,
            body: issue
        })
        .catch(e => {
            showError(e);

            dispatch(C.ISSUE_UPDATE_FAIL, {
                id: issueId,
                [statusName]: !status
            });
        });
}

/**
 * Increase issue severity
 * @param {Model} issue
 */
export function increaseSeverity(issue) {
    let severity = issue.get('severity');

    if (severity === HIGH) return;

    if (severity === LOW) {
        severity = MEDIUM;
    }
    else if (severity === MEDIUM) {
        severity = HIGH;
    }

    changeSeverity(issue, severity);
}

/**
 * Decrease issue severity
 * @param {Model} issue
 */
export function decreaseSeverity(issue) {
    let severity = issue.get('severity');

    if (severity === LOW) return;

    if (severity === MEDIUM) {
        severity = LOW;
    }
    else if (severity === HIGH) {
        severity = MEDIUM;
    }

    changeSeverity(issue, severity);
}

/**
 * Change current edit issue (or new issue)
 * @param {Map} issue new issue
 */
export function changeEditableIssue(issue) {
    dispatch(C.ISSUE_EDIT_CHANGE, { issue });
}

/**
 * Save edit issue (is new - create)
 * @param {Model} issue
 */
export function saveEditableIssue(issue) {
    showError('Implement me', issue);
}

//region locals
function changeSeverity(issue, severity) {
    const oldSeverity = issue.get('severity');
    const issueId = issue.get('id');

    dispatch(C.ISSUE_UPDATE_START, {
        severity,
        id: issueId
    });

    issues
        .update({
            issueId,
            body: { severity }
        })
        .catch(e => {
            showError(e);

            dispatch(C.ISSUE_UPDATE_FAIL, {
                id: issueId,
                severity: oldSeverity
            });
        });
}


//endregion privates


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
