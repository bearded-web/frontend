'use strict';

import { fromJS, List } from 'immutable';

var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    merge = require('../lib/merge-collections'),
    C = require('../constants');

var loading = true;



module.exports = Fluxxor.createStore({
    target: null,
    plans: [],
    allScans: [],
    $comments: List(),

    initialize: function() {
        this.bindActions(
            C.TARGETS_SET_CURRENT, this._onTargetsSetCurrent,
            C.TARGETS_UNSET_CURRENT, this._onTargetsUnsetCurrent,
            C.PLANS_FETCH_SUCCESS, this._onPlansFetchSuccess,
            C.SCANS_DETECT_CREATED, this._onScansDetectCreated,
            C.SCANS_FETCH_SUCCESS, this._onScansFetchSuccess,
            C.TARGETS_COMMENTS_FETCH_SUCCESS, this._onCommentsFetch
        );
    },

    getState: function() {
        var { target, $comments } = this,
            scans,
            detectPlan;

        detectPlan = _.find(this.plans, { name: 'detectWeb' }) || {};

        scans = _(this.allScans)
            .where({ target: target ? target.id : '-' })
            .sortBy('created')
            .reverse()
            .valueOf();

        return { target, scans, detectPlan, loading, $comments };
    },

    _onTargetsSetCurrent: function(target) {
        loading = false;
        this.target = target;

        this._emitChange();
    },

    _onTargetsUnsetCurrent: function() {
        loading = true;

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

    _onCommentsFetch(comments) {
        this.$comments = fromJS(comments);

        this.emit('change');
    },


    _emitChange: function() {
        this.emit('change');
    }
});
