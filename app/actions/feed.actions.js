'use strict';

var { feed, users, extractor } = require('../lib/api3'),
    { dispatchBuilder } = require('../lib/helpers'),
    C = require('../constants');


module.exports = {
    fetchFeedForTarget: function(targetId) {
        var items;

        return feed
            .list({ target: targetId })
            .then(extractor)
            .then((its) => items = its)
            .then((items) => _.pluck(items, 'scan'))
            .then((scans) => _.pluck(scans, 'owner'))
            .then(_.unique)
            .then((ids) => users.list({ id_in: ids.join(',') }))
            .then(extractor)
            .then((users) => items.map((item) => item.owner = _.where(users, { id: item.scan.owner })))
            .then(dispatchBuilder(C.FEED_FETCH_SUCCESS, this))
            .catch(function(err) {
                console.error(err, err.stack)
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
