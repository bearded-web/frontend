var _ = require('lodash');

/**
 * Merge one source collection to dest collection
 *
 * If element from source not fount in dest if will prepend to dest collection
 * If element fount it will merge to element in dest
 * @param {Array} dest
 * @param {Array} source
 * @param field
 */
module.exports = function mergeCollections(dest, source, field) {
    field = field || 'id';

    source.forEach(function(sourceItem) {
        var query = {},
            storedItem;

        query[field] = sourceItem[field];

        storedItem = _.find(dest, query);

        if (storedItem) {
            _.assign(storedItem, sourceItem);
        } else {
            dest.unshift(sourceItem);
        }
    });
};
