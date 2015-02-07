'use strict';

var { feed, users, extractor } = require('../lib/api3'),
    { dispatchBuilder } = require('../lib/helpers'),
    _ = require('lodash'),
    C = require('../constants');


module.exports = {
    fetchItems: function(type, id, limit, skip) {
        return this.flux.actions.feed.fetchFeedFor(type, id, {
            limit: limit || 3,
            skip: skip || 0
        });
    },

    fetchNewItems: function(type, id, lastUpdate) {
        return this.flux.actions.feed.fetchFeedFor(type, id, {
            updated_gte: lastUpdate
        });
    },

    fetchFeedFor: function(type, id, query) {
        query = query || {};
        query[type] = id;

        return this.flux.actions.feed.fetchFeed(query);
    },

    fetchFeed: function(query) {
        var items;

        return feed
            .list(query)
            .then(extractor)
            .then((its) => items = its) // jshint ignore:line
            .then((items) => _.pluck(items, 'owner'))
            .then(_.unique)
            .then((ids) => users.list({ id_in: ids.join(',') }))
            .then(extractor)
            .then((users) => items.forEach((item) => item.owner = _.find(users, { id: item.owner }))) // jshint ignore:line
            .then(() => items)
            .then(dispatchBuilder(C.FEED_FETCH_SUCCESS, this))
            .catch(function(err) {
                //TODO error handling
                window.console.error(err, err.stack);
            });
    }
};

