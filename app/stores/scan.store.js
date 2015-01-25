var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    C = require('../constants');

module.exports = Fluxxor.createStore({
    plans: [],
    allScans: [],
    reports: [],

    initialize: function() {
        this.bindActions(
            C.PLANS_FETCH_SUCCESS, this._onPlansFetchSuccess,
            C.REPORTS_FETCH_SUCCESS, this._onReportsFetchSuccess
        );
    },

    getState: function() {
        return {
            plans: this.plans,
            reports: this.reports
        };
    },

    _onPlansFetchSuccess: function(plans) {
        this.plans = plans;

        this._emitChange();
    },

    _onReportsFetchSuccess: function(reports) {
        this.reports = reports;

        this._emitChange();
    },


    _emitChange: function() {
        this.emit('change');
    }
});
