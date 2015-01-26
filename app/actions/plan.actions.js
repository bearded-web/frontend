var api = require('../lib/api2'),
    constants = require('../constants');

module.exports = {


    fetchPlans: function(planId) {
        if (planId) {
            return api.one('plans', planId).then((plan) => {
                dispatchPlans.call(this, [plan]);
            })
        } else {
            return api.all('plans').then(resultsExtractor(dispatchPlans, this));
        }
    }
};


function dispatchPlans(plans) {
    this.dispatch(constants.PLANS_FETCH_SUCCESS, plans);
}

function resultsExtractor(callback, self) {
    return function(data) {
        return callback.call(self, data.results);
    };
}
