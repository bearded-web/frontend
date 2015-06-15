import testTree from 'react-test-tree';
import Baobab from 'baobab';
import dataTree, { facets } from '../../lib/dataTree';
import EditableMembers from '../EditableMembers';

describe('EditableMembers', () => {
    const user = { id: 'user id', avatar: 'ima  ge', email: 'user@email.com', name: 's' };
    const users = { [user.id]: user };
    const members = [{ user: user.id }];

    let instance = null;
    let Component = null;

    beforeEach(() => {
        Component = stubContext(EditableMembers, {
            tree: new Baobab(dataTree, { facets }),
            api: {}
        });
        instance = testTree(<Component members={members} users={users}/>);
    });

    it('should render Members', () => {
        should.exist(instance.cmp.members);
    });

    it('should not render UserPicker', () => {
        should.not.exist(instance.cmp.picker);
    });


    it('should render picker after click on component', () => {
        instance.cmp.members.click();
        should.exist(instance.cmp.picker);
    });
    it('should render button after click on component', () => {
        instance.cmp.members.click();
        should.exist(instance.cmp.finish);
    });

    it('should remove picker after finish click click', () => {
        instance.cmp.members.click();
        instance.cmp.finish.click();
        should.not.exist(instance.cmp.picker);
    });

});
