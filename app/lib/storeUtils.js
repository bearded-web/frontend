import { OrderedMap } from 'immutable';

/**
 * Pick items from immutable bucket and return OrderedMap of items
 *  use with content stores
 * @param {Map} bucket immutable bucket
 * @param {Array} ids array of strings with items ids
 * @return {OrderedMap}
 */
export function pickItemsByIds(bucket, ids) {
    let items = new OrderedMap();

    items = items.asMutable();

    ids.forEach(function(id) {
        items.set(id, bucket.get(id));
    });

    return items.asImmutable();
}
