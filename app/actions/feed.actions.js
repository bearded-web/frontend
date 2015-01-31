'use strict';

var { feed, users, extractor } = require('../lib/api3'),
    { dispatchBuilder } = require('../lib/helpers'),
    _ = require('lodash'),
    C = require('../constants');


module.exports = {
    fetchItems: function(targetId, limit, skip) {
        return this.flux.actions.feed.fetchFeedForTarget(targetId, {
            limit: limit || 3,
            skip: skip || 0
        });
    },

    fetchNewItems: function(targetId, lastUpdate) {
        return this.flux.actions.feed.fetchFeedForTarget(targetId, {
            updated_gte: lastUpdate
        });
    },

    fetchFeedForTarget: function(targetId, query) {
        _.assign(query || {}, {
            target: targetId
        });

        return this.flux.actions.feed.fetchFeed(query);
    },

    fetchFeed: function(query) {
        var items;

        return feed
            .list(query)
            .then(extractor)
            .then((its) => items = its)
            .then((items) => _.pluck(items, 'scan'))
            .then((scans) => _.pluck(scans, 'owner'))
            .then(_.unique)
            .then((ids) => users.list({ id_in: ids.join(',') }))
            .then(extractor)
            .then((users) => items.forEach((item) => item.owner = _.find(users, { id: item.scan.owner })))
            .then(() => items)
            .then(dispatchBuilder(C.FEED_FETCH_SUCCESS, this))
            .catch(function(err) {
                console.error(err, err.stack);
            });
    }

};


/**
 * Return function that map first argument and get only field
 * @param {String} field name of field
 * @returns {function(items)}
 */
function pluck(field) {
    return _.rearg(_.pluck, [1, 0]).bind(null, field);
}

function usersByIds(ids) {
    return ids.map((uid) => users.get(uid));
}

function log(name) {
    return function(i) {

        console.log(name, i)

        return i
    }
}
