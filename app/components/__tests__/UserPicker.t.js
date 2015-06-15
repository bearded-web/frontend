import { spy } from 'sinon';
import testTree from 'react-test-tree';
import Baobab from 'baobab';
import dataTree, { facets } from '../../lib/dataTree';
import EditableMembers from '../UserPicker';

describe('UserPicker', () => {
    const value = 'some value';
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
        instance = testTree(<Component/>);
    });

    it('should render input with value', () => {
        instance = testTree(<Component value={value}/>);
        instance.cmp.cmp.input.getProp('value').should.be.eql(value);
    });

    it('should render users', () => {
        const users = [user];
        instance = testTree(<Component users={users}/>);
        instance.cmp.cmp.users.should.have.length(1);
    });

    it('should call props.setPickerValue with new value on input change', () => {
        const setPickerValue = spy();
        instance = testTree(<Component setPickerValue={setPickerValue}/>);
        instance.cmp.cmp.input.simulate.change({ target: { value } });
        setPickerValue.should.have.been.calledWith(value);
    });
});
