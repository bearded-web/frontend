import { spy } from 'sinon';
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
            router: () => null,
            tree: new Baobab(dataTree, { facets }),
            api: {}
        });
        instance = testTree(<Component members={members} users={users}/>);
    });

    it('should render Members', () => {
        should.exist(instance.cmp.cmp.members);
    });

    it('should not render UserPicker', () => {
        should.not.exist(instance.cmp.cmp.picker);
    });


    it('should render picker after click on component', () => {
        instance.cmp.cmp.members.click();
        should.exist(instance.cmp.cmp.picker);
    });
    it('should render button after click on component', () => {
        instance.cmp.cmp.members.click();
        should.exist(instance.cmp.cmp.finish);
    });

    it('should remove picker after finish click click', () => {
        instance.cmp.cmp.members.click();
        instance.cmp.cmp.finish.click();
        should.not.exist(instance.cmp.cmp.picker);
    });

    describe('addMember', () => {
        it('should call addMember prop', () => {
            const addMemberProp = spy();
            const project = { id: 'project id' };
            instance = testTree(<Component
                members={members}
                users={users}
                project={project}
                addMember={addMemberProp}/>);
            instance.cmp.cmp.element.addMember(user);
            addMemberProp.should.have.been.calledWith(project.id, user.id);
        });
        it('should call setPickerValue prop with empty string', () => {
            const addMemberProp = spy();
            const setPickerValue = spy();
            const project = { id: 'project id' };
            instance = testTree(<Component
                members={members}
                users={users}
                project={project}
                setPickerValue={setPickerValue}
                addMember={addMemberProp}/>);
            instance.cmp.cmp.element.addMember(user);
            setPickerValue.should.have.been.calledWith('');
        });
    });

});
