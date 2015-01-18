describe('AppStore', function() {
    var FluxxorTestUtils, fakeFlux, appStore, appStoreSpy, constants;

    jest.dontMock('util');
    jest.dontMock('../../app/stores/app.store');


    beforeEach(function() {
        constants = require('../../app/constants');

        FluxxorTestUtils = require('fluxxor-test-utils');
        FluxxorTestUtils.extendJasmineMatchers(this);
        // now our jasmine matchers are available

        var AppStore = require('../../app/stores/app.store.js');
        fakeFlux = FluxxorTestUtils.fakeFlux({ AppStore: new AppStore() });
        // now we have a FakeFlux instance that has .stores.MyStore

        appStore = fakeFlux.store('AppStore');
        // easier access to my store instance

        appStoreSpy = fakeFlux.makeStoreEmitSpy('AppStore');
        // now all our this.emit() calls from within the store are captured
    });

    describe('init', function() {
        it('must set initial state', function() {
            expect(appStore.inited).toEqual(false);
            expect(appStore.leftPanelVisible).toEqual(false);
            expect(appStore.isLogedIn).toEqual(false);
            expect(appStore.loginInProcess).toEqual(false);
            expect(appStore.loginError).toEqual('');
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
            expect(appStore.user.email).toEqual(email);
            expect(appStore.isLogedIn).toEqual(true);
            expect(appStore.loginInProcess).toEqual(false);
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
            expect(appStore.leftPanelVisible).toEqual(true);

            fakeFlux.dispatcher.dispatch({
                type: constants.APP_TOGGLE_LEFT_PANEL
            });

            expect(appStore.leftPanelVisible).toEqual(true);
        });
    });
});
