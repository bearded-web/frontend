'use strict';
var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    merge = require('../lib/merge-collections'),
    C = require('../constants');

module.exports = Fluxxor.createStore({
    agents: [],

    initialize: function() {
        this.bindActions(
            C.AGENTS_FETCH_SUCCESS, this._onAgentsFetchSuccess
        );
    },

    getState: function() {
        return {
            agents: this.agents
        };
    },

    _onAgentsFetchSuccess: function(agents) {
        merge(this.agents, agents);

        this.agents = _.sortBy(this.agents, { updated: -1 });

        this._emitChange();
    },


    _emitChange: function() {
        this.emit('change');
    }
});
