import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';
import { fromJS } from 'immutable';

describe.skip('newUserStore', () => {
    let createStore = null;
    let store = null;
    let api = null;
    let handlers = null;
    let handler = null;
    let initialState = null;

    beforeEach(() => {

        createStore = spy();
        mockery.registerMock('../lib/create-store', createStore);

        mockery.registerAllowable('../newUserStore', true);
        store = require('../newUserStore');

        api = createStore.firstCall.args[0];
        handlers = createStore.firstCall.args[1];
        initialState = createStore.firstCall.args[2];
    });


    describe('handlers', () => {
        describe('USER_NEW_CHANGE', () => {
            beforeEach(() => {
                handler = handlers[C.USER_NEW_CHANGE];
            });

            it('should clear disabled state', () => {
                const state = fromJS({});
                const user = fromJS({
                    email: 'good@email.com',
                    password: '12345678'
                });
                handler(state, { user }).get('disabled').should.be.false;
            });
            it('should set disabled state if bad email', () => {
                const state = fromJS({});
                const user = fromJS({
                    email: 'bad_email',
                    password: '12345678'
                });
                handler(state, { user }).get('disabled').should.be.true;
            });
            it('should set disabled state id bad password', () => {
                const state = fromJS({});
                const user = fromJS({
                    email: 'good@email.com',
                    password: 'badpwd'
                });
                handler(state, { user }).get('disabled').should.be.true;
            });

        });
    });
});
