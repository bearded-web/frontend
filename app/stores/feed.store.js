var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    merge = require('../lib/merge-collections'),
    C = require('../constants');


var feedItems = [];

module.exports = Fluxxor.createStore({
    initialize: function() {
        this.bindActions(
            C.FEED_FETCH_SUCCESS, this._onFeedFetchSuccess
        );
    },

    /**
     * Return feed items array for target
     * @param {String|Number} targetId target id for filter
     * @returns {Array}
     */
    getTargetFeed: function(targetId) {
        return _.where(feedItems, { target: targetId });
    },

    _onFeedFetchSuccess: function(items) {
        merge(feedItems, items);

        feedItems = _.sortBy(feedItems, { updated: -1 });

        this._emitChange();
    },


    _emitChange: function() {
        this.emit('change');
    }
});
