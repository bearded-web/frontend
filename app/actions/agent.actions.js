var api = require('../lib/api2'),
    constants = require('../constants');

module.exports = {
    fetch: function() {
        return api.all('agents')
            .then((data) => this.dispatch(constants.AGENTS_FETCH_SUCCESS, data.results));
    },


    approve: function(agentId) {
        return api.agents.approve(agentId)
            .then((agent) => this.dispatch(constants.AGENTS_FETCH_SUCCESS, [agent]))
    }
};
