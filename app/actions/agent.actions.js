'use strict';

var { agents, resultExtractor } = require('../lib/api3'),
    { dispatchBuilder } = require('../lib/helpers'),
    C = require('../constants');


module.exports = {
    fetch: function() {
        return agents.list().then(fetchDispatcher(this));
    },

    approve: function(agentId) {

        return agents.approve(agentId).then(fetchDispatcher(this));
    }
};

function fetchDispatcher(self) {
    return resultExtractor(dispatchBuilder(C.AGENTS_FETCH_SUCCESS, self));
}
