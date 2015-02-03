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
        });
    });

});
