import { spy } from 'sinon';
import testTree from 'react-test-tree';
import Baobab from 'baobab';
import dataTree, { facets } from '../../lib/dataTree';
import mockery from 'mockery';

describe('FeedFlow', () => {
    const project = {
        id: 'project id'
    };
    const target = {
        id: 'target id'
    };
    const item = {
        id: 'item id'
    };
    const item2 = {
        id: 'item 2 id'
    };
    const feedItems = { [item.id]: item, [item2.id]: item2 };
    const targetsFeeds = { [target.id]: [item.id] };
    const projectsFeeds = { [project.id]: [item.id, item2.id] };
    const type = 'target';
    let instance = null;
    let Component = null;
    let router = null;
    let fetchFeed = null;
    let fetchMoreFeedItems = null;

    beforeEach(() => {
        mockery.registerMock('./target-scan', MockComponent);
        mockery.registerAllowable('../FeedFlow');
        const FeedFlow = require('../FeedFlow');
        fetchMoreFeedItems = spy();
        fetchFeed = spy();
        router = () => ({});
        router.transitionTo = spy();
        Component = stubContext(FeedFlow, {
            tree: new Baobab(dataTree, { facets }),
            api: {},
            router
        });
        instance = testTree(<Component
            fetchFeed={fetchFeed}
            feedItems={feedItems}
            projectsFeeds={projectsFeeds}
            fetchMoreFeedItems={fetchMoreFeedItems}
            targetsFeeds={targetsFeeds}
            source={target}
            type={type}/>);
        instance = instance.cmp.cmp;
    });
    it('should render items from targetsFeeds', () => {
        instance.items[0].getProp('item').should.be.eql(item);
    });
    it('should render items from projectsFeeds', () => {
        instance = testTree(<Component
            feedItems={feedItems}
            projectsFeeds={projectsFeeds}
            fetchFeed={fetchFeed}
            targetsFeeds={targetsFeeds}
            source={project}
            type={'project'}/>);
        instance = instance.cmp.cmp;
        instance.items.should.have.length(2);
    });

    it('should should call fetchFeed when mounted', () => {
        fetchFeed.should.have.been.calledWith({ type, source: target });
    });

    it('should call fetchMoreFeedItems when btn clicked', () => {
        instance.more.click();
        fetchMoreFeedItems.should.have.been.calledWith({
             type, source: target
        });
    });
});
