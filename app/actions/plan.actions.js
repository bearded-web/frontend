'use strict';

var { plans } = require('../lib/api3'),
    { extractor } = require('../lib/helpers'),
    constants = require('../constants');

module.exports = {
    fetchPlans: function(planId) {
        var request = planId ? plans.get(planId) : plans.list();
        console.log(request)
        var a = request;

        a = a.then((data) =>  data.results ? data.results : [data])
        //console.log('extractor', a, extractor)
        a = a.then(dispatchPlans.bind(this));
        console.log('res', a)
    }
};


function dispatchPlans(plans) {
    /* jshint -W040 */
    this.dispatch(constants.PLANS_FETCH_SUCCESS, plans);
}
