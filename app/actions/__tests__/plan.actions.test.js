'use strict';
describe('plan.actions', function() {
    jest.dontMock('../../constants');
    jest.dontMock('../../lib/helpers');
    jest.setMock('../../lib/dispatcher', {
        dispatch: jest.genMockFunction()
    });
    jest.setMock('../../lib/api3', {
        plans: {
            get: jest.genMockFunction().mockImplementation(function() {
                return new Promise(function(resolve) {
                    resolve({ id: '123' });
                });
            })
        }
    });
    jest.dontMock('../plan.actions');

    describe('.fetchPlans()', function() {
        var value, flag;
        var C, actions, dispatch;
        beforeEach(function() {
            C = require('../../constants');
            actions = require('../plan.actions');
            dispatch = require('../../lib/dispatcher').dispatch;
        });


        pit('must dispatch plans success', function() {
            return actions.fetchPlans('1').then(() => {
                expect(dispatch).toBeCalledWith(C.PLANS_FETCH_SUCCESS, [{ id: '123' }]);
            });
        });
    });
});
