'use strict';

var { plans } = require('../lib/api3'),
    { extractor } = require('../lib/helpers'),
    dispatch = require('../lib/dispatcher').dispatch,
    constants = require('../constants');

module.exports = {
    fetchPlans: function(planId) {
        var request = planId ? plans.get(planId) : plans.list();

        return request
            .then((data) =>  data.results ? data.results : [data])
            .then(dispatchPlans.bind(this));
    }
};


function dispatchPlans(plans) {
    dispatch(constants.PLANS_FETCH_SUCCESS, plans);
}


