describe('ReportStore', function() {
    var FluxxorTestUtils, fakeFlux, store, storeSpy, C;

    jest.dontMock('util');
    jest.dontMock('../report.store');
    jest.dontMock('../../lib/merge-collections');


    beforeEach(function() {
        C = require('../../constants');

        FluxxorTestUtils = require('fluxxor-test-utils');
        FluxxorTestUtils.extendJasmineMatchers(this);
        var ReportStore = require('../report.store');
        fakeFlux = FluxxorTestUtils.fakeFlux({ ReportStore: new ReportStore() });
        store = fakeFlux.store('ReportStore');
        storeSpy = fakeFlux.makeStoreEmitSpy('ReportStore');
    });

    describe('.getState()', function() {
        it('must return initial object', function() {
            expect(store.getState().severity).toEqual('');
        });

        describe('dispatch REPORTS_SEVERITY_SELECT', function() {
            it('must set severity', function() {
                fakeFlux.dispatcher.dispatch({
                    type: C.REPORTS_SEVERITY_SELECT,
                    payload: 'low'
                });

                expect(store.getState().severity).toEqual('low');
                expect(storeSpy).lastEmittedWith('change');
            });
        });
    });

    describe('.getScanReports()', function() {
        it('must return empty array on init', function() {
            expect(store.getScanReports('somep').length).toEqual(0);
        });

        it('must return scan reports', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.REPORTS_FETCH,
                payload: {
                    status: 'success',
                    reports: [
                        { id: '1', data: 'data', scan: '1' },
                        { id: '2', data: 'data', scan: '1' },
                        { id: '3', data: 'data', scan: '2' }
                    ]
                }
            });

            expect(store.getScanReports('1').length).toEqual(2);
            expect(storeSpy).lastEmittedWith('change');
        });

        it('must rturn scan reports from multireport', function() {
            var scan = 'scanId1';

            fakeFlux.dispatcher.dispatch({
                type: C.REPORTS_FETCH,
                payload: {
                    status: 'success',
                    reports: [{
                        scan,
                        type: 'multi',
                        multi: [
                            {
                                scan,
                                type: 'issues',
                                issues: ['some issue']
                            },
                            {
                                scan,
                                type: 'raw',
                                raw: '{"data":"raw json data"}'
                            },
                            {
                                scan,
                                type: 'techs',
                                techs: [{name: 'angular'}]
                            }
                        ]
                    }]
                }
            });

            expect(store.getScanReports(scan).length).toEqual(3);
        });
    });

});
