describe('plan.actions', function() {
    jest.dontMock('../plan.actions');
    jest.dontMock('../../constants');
    jest.dontMock('../../lib/helpers');
    jest.setMock('../../lib/api3', {
        plans: {
            get: jest.genMockFunction().mockReturnValue(new Promise(function(resolve) {
                    console.log('in promise')
                    resolve({ id: '123' })
                })
            )
        }
    });

    var C = require('../../constants');


    describe('.fetchPlans()', function() {

        var FluxxorTestUtils,
            fakeFlux,
            myActionsSpy;


        beforeEach(function() {
            FluxxorTestUtils = require('fluxxor-test-utils').extendJasmineMatchers(this);
            fakeFlux = FluxxorTestUtils.fakeFlux({}, require('../plan.actions'));
            myActionsSpy = fakeFlux.makeActionsDispatchSpy();
        });


        it('must dispatch plans success', function() {
            fakeFlux.actions.fetchPlans('1');
            console.log(myActionsSpy.getLastCall());
            expect(myActionsSpy).lastDispatchedWith(C.PLANS_FETCH_SUCCESS);
        });
    });
});
