import { spy } from 'sinon';
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

    describe('onDelete', () => {
        let onDelete = null;

        beforeEach(() => {
            onDelete = spy();
        });

        it('should render remove button if onDelete prop', () => {
            Component = stubContext(Members, {
                tree: new Baobab(dataTree, { facets }),
                api: {}
            });
            instance = testTree(<Component members={members} users={users} onDelete={onDelete}/>);
            const link = byTag(instance.cmp.cmp.users[0].element, 'a')[0];

            should.exist(link);
        });

        it('should call onDelete with user when click link', () => {
            Component = stubContext(Members, {
                tree: new Baobab(dataTree, { facets }),
                api: {}
            });
            instance = testTree(<Component members={members} users={users} onDelete={onDelete}/>);
            const link = nodeByTag(instance.cmp.cmp.users[0].element, 'a')[0];

            Simulate.click(link);
            onDelete.should.have.been.calledWith(user);
        });
    });
});
