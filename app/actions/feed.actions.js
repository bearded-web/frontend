import { pluck } from 'lodash';
import { captureException } from 'raven-js';


var { feed, users } = require('../lib/api3'),
    dispatcher = require('../lib/dispatcher'),
    { dispatchBuilder, extractor } = require('../lib/helpers'),
    _ = require('lodash'),
    C = require('../constants');

module.exports = {
    /**
     * Fetch feed for type
     * @param {String} type entity type "target" or "project"
     * @param {String} id entity id
     * @param {Number} limit items limit to fetch
     * @param {Number} skip number items to skip
     * @return {Promise}
     */
    fetchItems: function(type, id, limit, skip) {
        return this.fetchFeedFor(type, id, {
            limit: limit || 3,
            skip: skip || 0
        });
    },

    fetchNewItems: function(type, id, lastUpdate) {
        return this.fetchFeedFor(type, id, {
            updated_gte: lastUpdate
        });
    },

    fetchFeedFor: function(type, id, query) {
        query = query || {};
        query[type] = id;

        return this.fetchFeed(query);
    },

    /**
     * Fetch feed items
     * @param {Object} query fetch params
     * @return {Promise}
     */
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
            .then(function() {
                dispatcher.dispatch(C.FEED_FETCH_SUCCESS, items);

                let scans = pluck(items, 'scan');
                dispatcher.dispatch(C.SCANS_FETCH_SUCCESS, scans);
            })
            .catch(e => captureException(e));
    }
};

