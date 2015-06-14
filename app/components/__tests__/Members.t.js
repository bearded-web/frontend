import testTree from 'react-test-tree';
import Baobab from 'baobab';
import dataTree, { facets } from '../../lib/dataTree';
import Members from '../Members';

describe('Members', () => {
    const user = { id: 'user id', avatar: 'ima  ge', email: 'user@email.com', name: 's' };
    const users = { [user.id]: user };
    const members = [{ user: user.id }];

    let instance = null;
    let Component = null;

    beforeEach(() => {
        Component = stubContext(Members, {
            tree: new Baobab(dataTree, { facets }),
            api: {}
        });
        instance = testTree(<Component members={members} users={users}/>);
    });

    it('should render users', () => {
        instance.cmp.users.should.have.length(1);
    });

    it('should render empty position if user no loaded yet', () => {
        const members = [{ user: user.id + ' not user id' }];
        Component = stubContext(Members, {
            tree: new Baobab(dataTree, { facets }),
            api: {}
        });
        instance = testTree(<Component members={members} users={users}/>);
    });
});
