/**
 * populate cursor data with fetch results
 *
 * @param {Object} cursor baobab cursor to object
 * @param {Array} data results from fetch
 */
export default function populate(cursor, data) {
    data.forEach(t => cursor.update({ [t.id]: { $set: t } }));
}
