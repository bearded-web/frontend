var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    C = require('../constants');

module.exports = Fluxxor.createStore({
    plans: [],
    allScans: [],

    initialize: function() {
        this.bindActions(
            C.PLANS_FETCH_SUCCESS, this._onPlansFetchSuccess
        );
    },

    getState: function() {
        return {
            plans: this.plans
        };
    },

    _onPlansFetchSuccess: function(plans) {
        this.plans = plans;

        this._emitChange();
    },


    _emitChange: function() {
        this.emit('change');
    }
});
