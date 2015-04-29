'use strict';

import { Map, fromJS } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';

describe('UserSettingsForm', function() {
    let createStore = null;
    let store = null;
    let api = null;
    let handlers = null;
    let initialState = null;
    let handler = null;
    let state = null;

    beforeEach(() => {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: false
        });

        createStore = spy();
        mockery.registerMock('../lib/create-store', createStore);

        mockery.registerMock('../router', {});

        mockery.registerAllowable('../user-settings.store', true);
        store = require('../user-settings.store');

        api = createStore.firstCall.args[0];
        handlers = createStore.firstCall.args[1];
        initialState = createStore.firstCall.args[2];
    });

    it('must call createStore', () => {
        createStore.should.have.been.calledOnce;
    });

    it('should populate initial state', () => {

        initialState.toJS().should.be.eql({
            password: '',
            oldPassword: '',
            loading: false,
            error: ''
        });
    });

    describe('handlers', () => {

        describe('US_PASSWORD_FIELD_CHANGE', () => {
            before(() => {
                handler = handlers[C.US_PASSWORD_FIELD_CHANGE];
            });

            beforeEach(() => {
                state = Map();
            });

            it('should change password in store', () => {
                const password = 'test 1';

                state = handler(state, { password });

                state.get('password').should.be.eql(password);
            });
        });


        describe('US_OLD_PASSWORD_FIELD_CHANGE', () => {
            before(() => {
                handler = handlers[C.US_OLD_PASSWORD_FIELD_CHANGE];
            });

            beforeEach(() => {
                state = Map();
            });

            it('should change password in store', () => {
                const oldPassword = 'test 1';
                state = handler(state, { oldPassword });
                state.get('oldPassword').should.be.eql(oldPassword);
            });

        });

        describe('US_PASSWORD_CHANGE_START', () => {
            beforeEach(() => {
                handler = handlers[C.US_PASSWORD_CHANGE_START];
                state = Map();
            });

            it('should set loading to true', () => {
                state = handler(state);

                state.get('loading').should.eql(true);
            });
        });

        describe('US_PASSWORD_CHANGE_SUCCESS', () => {
            before(() => {
                handler = handlers[C.US_PASSWORD_CHANGE_SUCCESS];
            });

            beforeEach(() => {
                state = Map({
                    password: 'some p',
                    oldPassword: 'sdfasdf',
                    loading: true
                });
            });

            it('should clear password', () => {
                const password = 'test 1';

                state = handler(state);

                state.get('password').should.be.eql('');
                state.get('oldPassword').should.be.eql('');
            });

            it('should clear loading', () => {
                state = handler(state);

                state.get('loading').should.be.false;
            });
            it('should clear error', () => {
                state = handler(state);

                state.get('error').should.be.empty;
            });
        });
        describe('US_PASSWORD_CHANGE_FAIL', () => {
            before(() => {
                handler = handlers[C.US_PASSWORD_CHANGE_FAIL];
            });

            beforeEach(() => {
                state = Map({
                    password: 'some p',
                    oldPassword: 'sdfasdf',
                    loading: true
                });
            });

            it('should set error message', () => {
                const message = 'error message';

                state = handler(state, { message });

                state.get('error').should.be.eql(message);
            });
        });
    });
});
