import { captureException } from '../lib/raven';
import { pluck, sortBy, union } from 'lodash';

//TODO fetch only undefined users

export async function fetchFeed({ tree, api }, { type, source }) {
    await fetch({
        tree,
        api,
        type,
        source,
        query: {
            [type]: source.id,
            limit: tree.get('feedFetchLimit')
        }
    });
}

export async function fetchMoreFeedItems({ tree, api }, { type, source }) {
    const relCursor = getRelationCursor(tree, type, source);

    await fetch({
        tree,
        api,
        type,
        source,
        query: {
            [type]: source.id,
            limit: tree.get('feedFetchLimit'),
            skip: relCursor.get().length
        }
    });
}

export async function fetchNewFeedItems({ tree, api }, { type, source }) {
    const relCursor = getRelationCursor(tree, type, source);
    if (!relCursor.get()) {
        //TODO add test
        relCursor.set([]);
        tree.commit();
    }
    const firstItemId = relCursor.get()[0];
    const query = {
        [type]: source.id
    };

    if (firstItemId) {
        /* eslint-disable */
        query.updated_gte = tree.select('feedItems', firstItemId).get().updated;
        /* eslint-enable */
    }
    await fetch({
        tree,
        api,
        type,
        source,
        query
    });
}

async function fetch({ tree, api, query, type, source }) {
    const relCursor = getRelationCursor(tree, type, source);

    try {
        const { results, count } = await api.feed.list(query);
        populateItems({ tree }, results, relCursor);
        getCountsCursor(tree, type, source).set(count);
        tree.commit();
        await populateOwners({ tree, api }, results);
        tree.commit();
    } catch (e) {
        captureException(e);
    }
}

function getRelationCursor(tree, type, source) {
    return tree
        .select(type === 'project' ? 'projectsFeeds' : 'targetsFeeds', source.id);
}
function getCountsCursor(tree, type, source) {
    return tree
        .select(type === 'project' ? 'projectsFeedsCounts' : 'targetsFeedsCounts', source.id);
}
function populateItems({ tree }, items, relationCursor) {
    const cursor = tree.select('feedItems');
    items.forEach(i => {
        cursor.set(i.id, i);
    });
    tree.commit();
    let ids = union(relationCursor.get(), pluck(items, 'id'));
    ids = sortBy(ids, i => -(new Date(cursor.get(i).updated)));
    relationCursor.set(ids);
}

async function populateOwners({ tree, api }, feedItems) {
    const owners = pluck(feedItems, 'owner');
    const { results: users } = await api.users.list({
        /* eslint-disable */
        id_in: owners.join(',')
        /* eslint-enable */
    });
    const cursor = tree.select('users');
    users.forEach(t => cursor.update({ [t.id]: { $set: t } }));
}
