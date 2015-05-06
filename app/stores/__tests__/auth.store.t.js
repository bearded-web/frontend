'use strict';

import { Map, fromJS } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';

describe('AuthStore', function() {
    let createStore = null;
    let store = null;
    let api = null;
    let handlers = null;
    let initialState = null;

    beforeEach(() => {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: false
        });

        createStore = spy();
        mockery.registerMock('../lib/create-store', createStore);

        mockery.registerAllowable('../auth.store', true);
        store = require('../auth.store');

        api = createStore.firstCall.args[0];
        handlers = createStore.firstCall.args[1];
        initialState = createStore.firstCall.args[2];
    });

    it('should call createStore', () => {
        createStore.should.have.been.calledOnce;
    });

    describe('initial state', () => {
        it('should have loading=true', () => {
            initialState.toObject().loading.should.be.false;
        });

        it('should have empty resetPasswordError', () => {
            initialState.toObject().resetPasswordError.should.be.empty;
        });
    });

    describe('handlers', () => {
        let handler = null;
        let state = null;

        describe('AUTH_NEW_PASSWORD_START', () => {
            beforeEach(() => {
                handler = handlers[C.AUTH_NEW_PASSWORD_START];
                state = fromJS({
                    loading: false
                });
            });

            it('should set loading to true', () => {
                state = handler(state);
                state.get('loading').should.be.true;
            });
        });

        describe('AUTH_RESET_PASSWORD_START', () => {
            beforeEach(() => {
                handler = handlers[C.AUTH_RESET_PASSWORD_START];
                state = fromJS({
                    loading: false
                });
            });

            it('should bind handler', () => {
                handler.should.be.a('function');
            });

            it('should set loading to true', () => {
                state = handler(state);

                state.get('loading').should.be.true;
            });
        });

        describe('AUTH_RESET_PASSWORD_SUCCESS', () => {
            beforeEach(() => {
                handler = handlers[C.AUTH_RESET_PASSWORD_SUCCESS];
                state = fromJS({
                    loading: true
                });
            });

            it('should set loading to false', () => {
                state = handler(state);

                state.get('loading').should.be.false;
            });
        });

        describe('AUTH_RESET_PASSWORD_FAIL', () => {
            const error = 'some error';

            beforeEach(() => {
                handler = handlers[C.AUTH_RESET_PASSWORD_FAIL];
                state = fromJS({
                    loading: true,
                    resetPasswordError: ''
                });
            });

            it('should set loading to false', () => {
                state = handler(state, { message: error });

                state.get('loading').should.be.false;
            });

            it('should set resetPasswordError to error', () => {
                state = handler(state, { message: error });

                state.get('resetPasswordError').should.be.eql(error);
            });

            it('should set resetPasswordError to "Server error" if no message provided', () => {
                state = handler(state, {});

                state.get('resetPasswordError').should.be.eql('Server error');
            });
        });


        describe('AUTH_UNLOCK_START', () => {
            beforeEach(() => {
                handler = handlers[C.AUTH_UNLOCK_START];
                state = fromJS({
                    loading: false
                });
            });

            it('should set loading to true', () => {
                state = handler(state);
                state.get('loading').should.be.true;
            });
        });

        describe('AUTH_UNLOCK_SUCCESS', () => {
            beforeEach(() => {
                handler = handlers[C.AUTH_UNLOCK_SUCCESS];
                state = fromJS({
                    loading: true,
                    isLogedIn: false
                });
            });

            it('should set loading to false', () => {
                state = handler(state);
                state.get('loading').should.be.false;
            });

            it('should set isLogedIn to true', () => {
                state = handler(state);
                state.get('isLogedIn').should.be.true;
            });
        });

    });

    describe('api', function() {
        describe('.isAdmin()', function() {
            it('should return true if user has admin flag', function() {
                const store = {
                    getRawState() {
                        return fromJS({
                            user: { admin: true }
                        });
                    }
                };

                api.isAdmin.call(store).should.be.eql.true;
            });
            it('should return false if user has no admin flag', function() {
                const store = {
                    getRawState() {
                        return fromJS({
                            user: { admin: false }
                        });
                    }
                };

                api.isAdmin.call(store).should.be.eql.false;
            });
            it('should return false if no user', function() {
                const store = {
                    getRawState() {
                        return fromJS({
                            user: null
                        });
                    }
                };

                api.isAdmin.call(store).should.be.eql.false;
            });
        });
    });
});
