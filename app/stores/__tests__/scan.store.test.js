'use strict';
describe('ScanStore', function() {
    var FluxxorTestUtils, fakeFlux, store, storeSpy, C;

    jest.dontMock('util');
    jest.dontMock('../scan.store');
    jest.dontMock('../../lib/merge-collections');


    beforeEach(function() {
        C = require('../../constants');

        FluxxorTestUtils = require('fluxxor-test-utils');
        FluxxorTestUtils.extendJasmineMatchers(this);
        var Store = require('../scan.store');
        fakeFlux = FluxxorTestUtils.fakeFlux({ Store: new Store() });
        store = fakeFlux.store('Store');
        storeSpy = fakeFlux.makeStoreEmitSpy('Store');
    });

    xdescribe('.getState()', function() {
        //xdescribe('dispatch REPORTS_SEVERITY_SELECT', function() {
        //    it('must set severity', function() {
        //        fakeFlux.dispatcher.dispatch({
        //            type: C.REPORTS_SEVERITY_SELECT,
        //            payload: 'low'
        //        });
        //
        //        expect(store.getState().severity).toEqual('low');
        //        expect(storeSpy).lastEmittedWith('change');
        //    });
        //});

        it('must return plans []', function() {
            expect(store.getState().plans.length).toEqual(0);
        });

        it('must return filled plans after PLANS_FETCH_SUCCESS dispatched', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.PLANS_FETCH_SUCCESS,
                payload: [{ id: '123' }]
            });


            expect(store.getState().plans.length).toEqual(1);
        });

        it('must return selected plan {}', function() {
            expect(store.getState().selectedPlan).toEqual({});
        });

        it('must return newest updated plan as selected', function() {
            var plan = {
                    updated: '2015-01-25T17:36:23.071-03:00',
                    id: '123'
                },
                plan2 = {
                    updated: '2014-01-25T17:36:23.071-03:00',
                    id: '456'
                };

            fakeFlux.dispatcher.dispatch({
                type: C.PLANS_FETCH_SUCCESS,
                payload: [plan, plan2]
            });

            expect(store.getState().selectedPlan).toEqual(plan);
            expect(storeSpy).lastEmittedWith('change');
        });
    });

    describe('PLANS_SET_SELECTED', function() {
        it('must set selected plan by id', function() {
            var plan = {
                    updated: '2015-01-25T17:36:23.071-03:00',
                    id: '123'
                },
                plan2 = {
                    updated: '2014-01-25T17:36:23.071-03:00',
                    id: '456'
                };

            fakeFlux.dispatcher.dispatch({
                type: C.PLANS_FETCH_SUCCESS,
                payload: [plan, plan2]
            });

            fakeFlux.dispatcher.dispatch({
                type: C.PLANS_SET_SELECTED,
                payload: plan2.id
            });

            expect(store.getState().selectedPlan).toEqual(plan2);
            expect(storeSpy.getCalls()[1][0]).toEqual('change');
        });
    });

});
