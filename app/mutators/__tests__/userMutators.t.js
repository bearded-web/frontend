import { spy } from 'sinon';
import { setPickerValue } from '../userMutators';
import Baobab from 'baobab';
import dataTree from '../../lib/dataTree';

describe('userMutators', () => {
    describe('setPickerValue', () => {
        let email = 'email@test.com';
        let user = { id: '1', email };

        let tree = null;
        let api = null;

        beforeEach(() => {
            tree = new Baobab(dataTree);
            api = {
                users: { list: spy(() => Promise.resolve({ results: [user] })) }
            };
        });

        it('should change picker value', () => {
            setPickerValue({ tree, api }, email);
            tree.select('userPicker', 'value').get().should.be.eql(email);
        });

        it('should fetch users', async function() {
            await setPickerValue({ tree, api }, email);
            api.users.list.should.have.been.calledWith({ email });
        });

        it('should fill users', async function() {
            await setPickerValue({ tree, api }, email);
            tree.select('users').get(user.id).should.be.eql(user);
        });

        it('should add users ids to list', async function() {
            tree.select('userPicker', 'fetchDelay').set(-1);
            await setPickerValue({ tree, api }, email);
            email = 'new@email.t';
            user = { id: '2', email };
            api = {
                users: { list: spy(() => Promise.resolve({ results: [user] })) }
            };
            await setPickerValue({ tree, api }, email);
            tree.select('userPicker', 'users').get().
                should.be.eql([user.id]);
        });

    });
});
