'use strict';
describe('AppStore', function() {
    var FluxxorTestUtils, fakeFlux, store,
        appStoreSpy, constants;

    jest.dontMock('util');
    jest.dontMock('../app.store');


    beforeEach(function() {
        constants = require('../../constants');

        FluxxorTestUtils = require('fluxxor-test-utils');
        FluxxorTestUtils.extendJasmineMatchers(this);
        // now our jasmine matchers are available

        var AppStore = require('../app.store.js');
        fakeFlux = FluxxorTestUtils.fakeFlux({ AppStore: new AppStore() });
        // now we have a FakeFlux instance that has .stores.MyStore

        store = fakeFlux.store('AppStore');
        // easier access to my store instance

        appStoreSpy = fakeFlux.makeStoreEmitSpy('AppStore');
        // now all our this.emit() calls from within the store are captured
    });

    describe('init', function() {
        it('must set initial state', function() {
            expect(store.inited).toEqual(false);
            expect(store.leftPanelVisible).toEqual(false);
            expect(store.isLogedIn).toEqual(false);
            expect(store.loginInProcess).toEqual(false);
            expect(store.loginError).toEqual('');
        });

    });

    describe('.getState()', function() {
        it('must return initial state', function() {
            var state = store.getState();

            expect(state.user).toEqual(jasmine.any(Object));

            expect(state.inited).toEqual(false);
            expect(state.leftPanelVisible).toEqual(false);
            expect(state.isLogedIn).toEqual(false);
            expect(state.loginInProcess).toEqual(false);
            expect(state.loginError).toEqual('');
        });


        describe('USER_LOGIN_START', function() {
            it('must return .loginInProcess true', function() {
                expect(store.getState().loginInProcess).toBeFalsy();

                fakeFlux.dispatcher.dispatch({
                    type: constants.USER_LOGIN_START,
                    payload: { email: 'email' }
                });

                expect(store.getState().loginInProcess).toBeTruthy();
            });
        });

        describe('USER_LOGIN_SUCCESS', function() {
            var email = 'test@test.com';

            beforeEach(function() {
                fakeFlux.dispatcher.dispatch({
                    type: constants.USER_LOGIN_SUCCESS,
                    payload: { email: email }
                });
            });

            it('must return new state when dispatched USER_LOGIN_SUCCESS', function() {
                var state = store.getState();

                expect(state.user.email).toEqual(email);
                expect(state.isLogedIn).toEqual(true);
                expect(state.loginInProcess).toEqual(false);
            });
        });

        describe('USER_LOGIN_FAIL', function() {
            var reason = 'error reason';

            beforeEach(function() {
                fakeFlux.dispatcher.dispatch({
                    type: constants.USER_LOGIN_FAIL,
                    payload: reason
                });
            });

            it('must return error state', function() {
                var state = store.getState();

                expect(state.loginInProcess).toBeFalsy();
                expect(state.loginError).toEqual(reason);
            });
        });

        describe('APP_LIFT_SUCCESS', function() {
            beforeEach(function() {
                fakeFlux.dispatcher.dispatch({
                    type: constants.APP_LIFT_SUCCESS
                });
            });

            it('must set inited field', function() {
                var state = store.getState();

                expect(state.inited).toBeTruthy();
            });
        });


        describe('USER_LOGOUT_SUCCESS', function() {
            beforeEach(function() {
                fakeFlux.dispatcher.dispatch({
                    type: constants.USER_LOGOUT_SUCCESS
                });
            });

            it('must unset user', function() {
                var state = store.getState();

                expect(state.user.email).toBeFalsy();
            });

            it('must unset .isLogedIn', function() {
                var state = store.getState();

                expect(state.isLogedIn).toBeFalsy();
            });
        });

        describe('APP_TOGGLE_LEFT_PANEL', function() {
            it('must toggle panel', function() {
                var init = store.getState().leftPanelVisible;

                fakeFlux.dispatcher.dispatch({
                    type: constants.APP_TOGGLE_LEFT_PANEL
                });

                expect(store.getState().leftPanelVisible).toEqual(!init);
            });
        });

        describe('APP_LOGIN_PAGE_STATE', function() {
            it('must toggle panel', function() {
                fakeFlux.dispatcher.dispatch({
                    type: constants.APP_LOGIN_PAGE_STATE,
                    payload: 'test'
                });

                expect(store.getState().loginPageState).toEqual('test');
            });
        });

    });

    describe('.getProject()', function() {
        it('must return null before project fetched', function() {
            expect(store.getProject()).toEqual(null);
        });

        it('must return project after PROJECT_FETCH_SUCCESS', function() {
            var project = { id: '1' };

            fakeFlux.dispatcher.dispatch({
                type: constants.PROJECT_FETCH_SUCCESS,
                payload: project
            });

            expect(store.getProject()).toEqual(project);
        });
    });


    describe('dispatched USER_LOGIN_SUCCESS', function() {
        var email = 'test@test.com';

        beforeEach(function() {
            fakeFlux.dispatcher.dispatch({
                type: constants.USER_LOGIN_SUCCESS,
                payload: { email: email }
            });
        });

        it('must set data when dispatched USER_LOGIN_SUCCESS', function() {
            expect(store.user.email).toEqual(email);
            expect(store.isLogedIn).toEqual(true);
            expect(store.loginInProcess).toEqual(false);
            expect(appStoreSpy).lastEmittedWith('change');
        });
    });

    describe('dispatched APP_TOGGLE_LEFT_PANEL', function() {
        beforeEach(function() {
            fakeFlux.dispatcher.dispatch({
                type: constants.APP_TOGGLE_LEFT_PANEL
            });
        });

        it('.leftPanelVisible must become true', function() {
            expect(store.leftPanelVisible).toEqual(true);

            fakeFlux.dispatcher.dispatch({
                type: constants.APP_TOGGLE_LEFT_PANEL
            });

            expect(store.leftPanelVisible).toEqual(false);
        });
    });
});
