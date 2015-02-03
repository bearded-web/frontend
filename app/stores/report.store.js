'use strict';

var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    merge = require('../lib/merge-collections'),
    C = require('../constants');


var reports = [];

module.exports = Fluxxor.createStore({
    initialize: function() {
        this.bindActions(
            C.REPORTS_FETCH, this._onReportsFetch
        );
    },

    getScanReports: function(scan) {
        return _.where(reports, { scan });
    },

    _onReportsFetch: function(payload) {
        if (payload.status === 'success') {
            merge(reports, payload.reports);

            this._emitChange();
        }
    },


    _emitChange: function() {
        this.emit('change');
    }
});
