import { spy } from 'sinon';
import { fetchMoreFeedItems, fetchFeed, fetchNewFeedItems } from '../feedMutators';

describe('feedMutators', () => {
    const feedFetchLimit = 5;

    let type = 'target';
    let source = {
        id: 'target id'
    };
    let tree = null;
    let api = null;
    let item = null;
    let item2 = null;
    let user = null;

    beforeEach(() => {
        type = 'target';
        source = {
            id: 'target id'
        };
        item2 = {
            id: 'item2 id',
            updated: '2015-06-25T17:34:29.054+03:00'
        };
        user = {
            id: 'user id'
        };
        item = {
            id: 'item id',
            owner: user.id,
            updated: '2015-06-25T15:34:29.13+03:00'
        };
        tree = createTree();
        tree.set('feedFetchLimit', feedFetchLimit);
        tree.commit();

        api = {
            feed: {
                list: spy(() => Promise.resolve({ results: [item] }))
            },
            users: {
                list: spy(() => Promise.resolve({ results: [user] }))
            }
        };
    });

    describe('fetchFeed', () => {
        beforeEach(async function() {
            await fetchFeed({ tree, api }, { type, source });
        });

        it('should call api with target source', async function() {
            api.feed.list.should.have.been.calledWith({
                [type]: source.id,
                limit: feedFetchLimit
            });
        });
        it('should populate feedItems', async function() {
            tree.select('feedItems', item.id).get().should.be.eql(item);
        });
        it('should populate targetsFeeds', async function() {
            tree.select('targetsFeeds', source.id).get().should.be.eql([item.id]);
        });
        it('should populate projectsFeeds', async function() {
            type = 'project';
            source = { id: 'project id' };
            await fetchFeed({ tree, api }, { type, source });
            tree.select('projectsFeeds', source.id).get().should.be.eql([item.id]);
        });
        it('should should call users api', () => {
            /* eslint-disable */
            api.users.list.should.have.been.calledWith({ id_in: user.id });
            /* eslint-enable */
        });
        it('should populate users', () => {
            tree.select('users', user.id).get().should.be.eql(user);
        });
    });
    describe('fetchMoreFeedItems', () => {
        beforeEach(async function() {
            tree.select('feedItems').set(item.id, item);
            tree.select('targetsFeeds').set(source.id, [item.id]);
            tree.commit();
            api.feed.list = spy(() => Promise.resolve({ results: [item2] }));
            await fetchMoreFeedItems({ tree, api }, { type, source });
        });

        it('should call api', () => {
            api.feed.list.should.have.been.calledWith({
                limit: feedFetchLimit,
                skip: 1,
                target: source.id
            });
        });
        it('should sort items by updated field', () => {
           tree.select('targetsFeeds', source.id).get().should.be.eql([
               item2.id, item.id
           ]);
        });
    });
    describe('fetchNewFeedItems', () => {
        beforeEach(async function() {
            tree.select('feedItems').set(item.id, item);
            tree.select('targetsFeeds').set(source.id, [item.id]);
            tree.commit();
            api.feed.list = spy(() => Promise.resolve({ results: [item2] }));
            await fetchNewFeedItems({ tree, api }, { type, source });
        });

        it('should call api', async function() {
            api.feed.list.should.have.been.calledWith({
                updated_gte: item.updated,
                [type]: source.id
            });
        });
        it('should call api without updated_gte if no items', async function() {
            tree.select('targetsFeeds', source.id).set([]);
            tree.commit();
            await fetchNewFeedItems({ tree, api }, { type, source });
            api.feed.list.should.have.been.calledWith({
                [type]: source.id
            });
        });
    });
});
