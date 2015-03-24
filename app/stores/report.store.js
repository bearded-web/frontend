'use strict';

var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    merge = require('../lib/merge-collections'),
    C = require('../constants');


var reports = [],
    severity = '';

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
        return _.where(reports, { scan });
    },

    _onReportsSeveritySelect: function(s) {
        severity = s;

        this._emitChange();
    },

    _onReportsFetch: function(payload) {
        if (payload.status === 'success') {
            var newReports = flattenReports(payload.reports);

            merge(reports, newReports);

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
