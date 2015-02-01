'use strict';

var { plans, resultExtractor } = require('../lib/api3'),
    constants = require('../constants');

module.exports = {
    fetchPlans: function(planId) {
        var request = planId ? plans.get(planId) : plans.list();

        return request.then(resultExtractor(dispatchPlans, this));
    }
};


function dispatchPlans(plans) {
    /* jshint -W040 */
    this.dispatch(constants.PLANS_FETCH_SUCCESS, plans);
}
