var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    merge = require('../lib/merge-collections'),
    C = require('../constants');

module.exports = Fluxxor.createStore({
    plans: [],
    allScans: [],
    reports: [],

    initialize: function() {
        this.bindActions(
            C.PLANS_FETCH_SUCCESS, this._onPlansFetchSuccess,
            C.REPORTS_FETCH_SUCCESS, this._onReportsFetchSuccess,
            C.SCANS_FETCH_SUCCESS, this._onScansFetchSuccess
        );
    },

    getState: function() {
        return {
            plans: this.plans,
            reports: this.reports
        };
    },

    getScanState: function(scanId) {
        var scan = _.find(this.allScans, { id: scanId }),
            planId = scan && scan.plan,
            plan = _.find(this.plans, { id: planId });

        console.log('plan', plan, planId, this.plans);

        return {
            reports: _.where(this.reports, { scan: scanId }),
            scan: scan,
            plan: plan
        };
    },

    _onPlansFetchSuccess: function(plans) {
        merge(this.plans, plans);

        this._emitChange();
    },

    _onReportsFetchSuccess: function(reports) {
        this.reports = reports;

        this._emitChange();
    },

    _onScansFetchSuccess: function(scans) {
        merge(this.allScans, scans);

        this._emitChange();
    },

    _emitChange: function() {
        this.emit('change');
    }
});
