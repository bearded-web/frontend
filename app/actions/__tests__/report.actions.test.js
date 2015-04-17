'use strict';
describe('plan.actions', function() {
    jest.dontMock('../../constants');
    jest.dontMock('../../lib/helpers');
    jest.setMock('../../lib/dispatcher', {
        dispatch: jest.genMockFunction()
    });
    jest.setMock('../../lib/api3', {
        scans: {
            reports: jest.genMockFunction().mockImplementation(function() {
                return new Promise(function(resolve) {
                    resolve({ id: '1234' });
                });
            })
        }
    });
    jest.dontMock('../report.actions');

    var C, actions, dispatch;

    beforeEach(function() {
        C = require('../../constants');
        actions = require('../report.actions');
        dispatch = require('../../lib/dispatcher').dispatch;
    });

    describe('.fetchScanReports()', function() {
        pit('must dispatch data from api', function() {
            return actions.fetchScanReports('1').then(() => {
                expect(dispatch).toBeCalledWith(C.REPORTS_FETCH, {
                    status: 'success',
                    reports: [{ id: '1234' }]
                });
            });
        });
    });

    describe('.selectSeverity()', function() {
        it('must dispatch REPORTS_SEVERITY_SELECT with severity', function() {
            actions.selectSeverity('medium');

            expect(dispatch).toBeCalledWith(C.REPORTS_SEVERITY_SELECT, 'medium');
        });
    });
});
