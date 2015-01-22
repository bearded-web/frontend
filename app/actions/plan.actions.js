var api = require('../lib/api2'),
    constants = require('../constants');

module.exports = {
    fetchPlans: function() {
        return api.all('plans')
            .then((data) => this.dispatch(constants.PLANS_FETCH_SUCCESS, data.results));
    }
};
