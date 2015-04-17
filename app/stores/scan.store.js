'use strict';
var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    merge = require('../lib/merge-collections'),
    C = require('../constants');

var state = {
    selectedPlan: null
};

module.exports = Fluxxor.createStore({
    plans: [],
    allScans: [],
    reports: [],

    initialize: function() {
        this.bindActions(
            C.PLANS_FETCH_SUCCESS, this._onPlansFetchSuccess,
            C.PLANS_SET_SELECTED, this._setSelectedPlan,
            C.REPORTS_FETCH_SUCCESS, this._onReportsFetchSuccess,
            C.SCANS_FETCH_SUCCESS, this._onScansFetchSuccess
        );
    },

    getState: function() {
        return {
            plans: this.plans,
            reports: this.reports,
            selectedPlan: state.selectedPlan || this.plans[0] || {}
        };
    },

    getScanState: function(scanId) {
        var scan = _.find(this.allScans, { id: scanId }),
            planId = scan && scan.plan,
            plan = _.find(this.plans, { id: planId });

        return {
            reports: _.where(this.reports, { scan: scanId }),
            scan: scan,
            plan: plan
        };
    },

    /**
     * Set plan as selected
     * @param {String} id plan id
     */
    _setSelectedPlan: function(id) {
        state.selectedPlan = _.find(this.plans, { id }) || null;

        this._emitChange();
    },

    _onPlansFetchSuccess: function(plans) {
        merge(this.plans, plans);

        this.plans = _.sortBy(this.plans, (plan) => -new Date(plan.updated));

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
    },

    _freshest: function(item) {
        return -new Date(item.updated);
    }
});
