var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    merge = require('../lib/merge-collections'),
    C = require('../constants');

module.exports = Fluxxor.createStore({
    target: null,
    plans: [],
    allScans: [],

    initialize: function() {
        this.bindActions(
            C.TARGETS_SET_CURRENT, this._onTargetsSetCurrent,
            C.TARGETS_UNSET_CURRENT, this._onTargetsUnsetCurrent,
            C.PLANS_FETCH_SUCCESS, this._onPlansFetchSuccess,
            C.SCANS_DETECT_CREATED, this._onScansDetectCreated,
            C.SCANS_FETCH_SUCCESS, this._onScansFetchSuccess
        );
    },

    getState: function() {
        var target = this.target,
            scans,
            detectPlan;

        detectPlan = _.find(this.plans, { name: 'detectWeb' }) || {};

        scans = _(this.allScans)
            .where({ target: target ? target.id : '-' })
            .sortBy('created')
            .reverse()
            .valueOf();

        return { target, scans, detectPlan };
    },

    _onTargetsSetCurrent: function(target) {
        this.target = target;

        this._emitChange();
    },

    _onTargetsUnsetCurrent: function() {
        this.target = null;

        this._emitChange();
    },

    _onPlansFetchSuccess: function(plans) {
        this.plans = plans;

        this._emitChange();
    },

    _onScansDetectCreated: function(scan) {
        this.allScans.unshift(scan);

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
