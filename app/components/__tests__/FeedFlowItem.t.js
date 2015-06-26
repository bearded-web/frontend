import { spy } from 'sinon';
import testTree from 'react-test-tree';
import Baobab from 'baobab';
import dataTree, { facets } from '../../lib/dataTree';
import mockery from 'mockery';

describe('FeedFlowItem', () => {
    const user = {
        id: 'user id'
    };
    const item = {
        id: 'item id',
        owner: user.id
    };
    const users = { [user.id]: user };
    let instance = null;
    let Component = null;
    let router = null;

    beforeEach(() => {
        router = () => ({});
        router.transitionTo = spy();
        mockery.registerMock('./target-scan', MockComponent);
        mockery.registerAllowable('../FeedFlowItem');
        Component = stubContext(require('../FeedFlowItem'), {
            tree: new Baobab(dataTree, { facets }),
            api: {},
            router
        });
        instance = testTree(<Component
            users={users}
            item={item}/>);
        instance = instance.cmp.cmp;
    });

    it('should render feed-item with item + owner inside', () => {
        instance.item.getProp('item').owner.should.be.eql(user);
    });
});
