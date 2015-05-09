import Fluxxor from 'fluxxor';
import { where } from 'lodash';
import merge from '../lib/merge-collections';
import C from '../constants';

const reports = [];

let severity = '';

module.exports = Fluxxor.createStore({
    initialize: function() {
        this.bindActions(
            C.REPORTS_FETCH, this._onReportsFetch,
            C.REPORTS_SEVERITY_SELECT, this._onReportsSeveritySelect
        );
    },

    getState: function() {
        return {
            severity
        };
    },

    getScanReports: function(scan) {
        return where(reports, { scan });
    },

    _onReportsSeveritySelect: function(s) {
        severity = s;

        this._emitChange();
    },

    _onReportsFetch: function(payload) {
        if (payload.status === 'success') {
            var newReports = flattenReports(payload.reports);

            if (newReports[0].scan === '554e890bc168ae418a00000f') {
                newReports[0].issues[0].severity = 'high';
            }
            merge(reports, newReports);
            severity = getSeverity(reports);

            this._emitChange();
        }
    },

    _emitChange: function() {
        this.emit('change');
    }
});

function flattenReports(reportsArray) {
    var result = [];

    reportsArray.forEach(function(report) {
        if (report.type === 'multi') {
            result.push.apply(result, flattenReports(report.multi));

            return;
        }

        result.push(report);
    });

    return result;
}

function getIssues(reports) {
    var issues = {
        info: [],
        low: [],
        medium: [],
        high: [],
        error: []

    };

    reports.forEach((report) => {
        if (report.type === 'issues') {
            report.issues.forEach(function(issue) {
                issues[issue.severity].push(issue);
            });
        }

        if (report.type === 'multi') {
            var subIssues = this.getIssuesFromReports(report.multi);

            this.mergeIssues(issues, subIssues);
        }
    });

    return issues;
}

function getSeverity(reports) {
    const issues = getIssues(reports);

    let severity;

    if (issues.high.length) {
        severity = 'high';
    }
    if (issues.medium.length) {
        severity = 'medium';
    }
    if (issues.low.length) {
        severity = 'low';
    }

    return severity;
}
