import { is, Map, List, OrderedMap, fromJS } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';

describe.skip('targetCreate', function() {
    let createStore = null;
    let store = null;
    let api = null;
    let handlers = null;
    let initialState = null;
    let state = null;

    beforeEach(() => {
        createStore = spy();
        mockery.registerMock('../lib/create-store', createStore);

        mockery.registerAllowable('../target-create.store', true);
        store = require('../target-create.store');

        api = createStore.firstCall.args[0];
        handlers = createStore.firstCall.args[1];
        initialState = createStore.firstCall.args[2];
    });


    describe('initial state', function() {
        it('should contain loading field', function() {
            initialState.get('loading').should.be.false;
        });
        it('shouldcontain empty error', () => {
            initialState.get('error').should.be.empty;
        });
    });

    describe('handlers', () => {
        let handler = null;

        describe('ADD_TARGET', () => {
            let state = null;

            before(() => {
                handler = handlers[C.ADD_TARGET];
            });

            beforeEach(() => {
                state = fromJS({
                    loading: false
                });
            });

            it('should set loading to true', function() {
                handler(state).get('loading').should.be.true;
            });
        });
        describe('ADD_TARGET_FAIL', () => {
            const error = 'some error text';
            const payload = { message: error };

            let state = null;

            before(() => {
                handler = handlers[C.ADD_TARGET_FAIL];
            });

            beforeEach(() => {
                state = fromJS({
                    loading: true
                });
            });

            it('should set loading to false', function() {
                handler(state, payload).get('loading').should.be.false;
            });

            it('should set error message', () => {
                handler(state, payload).get('error')
                    .should.be.eql(error);
            });
        });
        describe('ADD_TARGET_SUCCESS', () => {
            const target = {};
            const payload = { target };

            let state = null;

            before(() => {
                handler = handlers[C.ADD_TARGET_SUCCESS];
            });

            beforeEach(() => {
                state = fromJS({
                    loading: true
                });
            });

            it('should set loading to false', function() {
                handler(state, payload).get('loading').should.be.false;
            });

            it('should clear error', () => {
                handler(state, payload).get('error')
                    .should.be.empty;
            });
        });

        describe('TARGETS_CHANGE_EDITABLE', () => {
            beforeEach(() => {
                handler = handlers[C.TARGETS_CHANGE_EDITABLE];
                state = fromJS({
                    target: fromJS({
                        type: 'web'
                    })
                });
            });

            it('should merge target', () => {
                state = handler(state, {
                    target: fromJS({
                        type: 'android'
                    })
                });

                state.getIn(['target', 'type']).should.be.eql('android');
            });

        });
    });

    describe('api', function() {
        //TODO add api test
    });
});
