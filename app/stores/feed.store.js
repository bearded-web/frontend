'use strict';

var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    C = require('../constants');


let feedItems = [];

module.exports = Fluxxor.createStore({
    initialize: function() {
        this.bindActions(
            C.FEED_FETCH_SUCCESS, this._onFeedFetchSuccess,
            C.SCANS_CREATION, this._onScansCreation
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

    /**
     * Return feed items array for project
     * @param {String|Number} projectId project id for filter
     * @returns {Array}
     */
    getProjectFeed: function(projectId) {
        return _.where(feedItems, { project: projectId });
    },


    /**
     * Return feed for source
     * @param {String} type source type
     * @param {Object|String} source source or source id
     * @returns {Array} array of items
     */
    getFeedFor: function(type, source) {
        if (!source) { return []; }

        var id = source.id || source;

        if (type === 'target') {
            return this.getTargetFeed(id);
        }
        else if(type === 'project') {
            return this.getProjectFeed(id);
        }
        else {
            //TODO make loging
            //console.warn('wrong type', type);
            return [];
        }
    },

    _onFeedFetchSuccess: function(items) {

        items.forEach(function(sourceItem) {
            var storedItem = _.find(feedItems, function(sItem) {
                if (sItem.id === sourceItem.id) { return true; }

                if (sourceItem.type === 'scan' && !sItem.id &&
                    sItem.type === 'scan' && sItem.scan.id === sourceItem.scan.id) {

                    return true;
                }
            });


            if (sourceItem.scan && _.isString(sourceItem.scan.plan)) {
                var plans = window.flux.store('ScanStore').getState().plans;

                var plan = _.find(plans, { id: sourceItem.scan.plan });

                sourceItem.scan.plan = plan;
            }

            if (storedItem) {
                _.assign(storedItem, sourceItem);
            } else {
                feedItems.unshift(sourceItem);
            }
        });

        feedItems = _.sortBy(feedItems, (item) => -new Date(item.updated));

        this._emitChange();
    },

    _onScansCreation: function(payload) {
        var { status, scan } = payload,
            exist,
            feedItem;

        if (status !== 'success') { return; }

        exist = _(feedItems).where({ type: 'scan' }).pluck('scan').pluck('id').includes(scan.id);

        if (exist) { return; }

        feedItem = {
            id: null,
            type: 'scan',
            target: scan.target,
            created: new Date(),
            updated: new Date(),
            owner: scan.owner,
            scan: scan
        };
        feedItems.unshift(feedItem);

        this._emitChange();
    },


    _emitChange: function() {
        this.emit('change');
    }
});
