'use strict';
describe('AgentsStore', function() {
    var FluxxorTestUtils, fakeFlux, agentsStore, agentsStoreSpy, C;

    jest.dontMock('util');
    jest.dontMock('fs');
    jest.dontMock('path');
    jest.dontMock('../agents.store');
    jest.dontMock('../../lib/merge-collections');


    beforeEach(function() {
        C = require('../../constants');

        FluxxorTestUtils = require('fluxxor-test-utils');
        FluxxorTestUtils.extendJasmineMatchers(this);
        // now our jasmine matchers are available

        var AgentsStore = require('../agents.store');
        fakeFlux = FluxxorTestUtils.fakeFlux({ AgentsStore: new AgentsStore() });
        // now we have a FakeFlux instance that has .stores.MyStore

        agentsStore = fakeFlux.store('AgentsStore');
        // easier access to my store instance

        agentsStoreSpy = fakeFlux.makeStoreEmitSpy('AgentsStore');
        // now all our this.emit() calls from within the store are captured
    });

    describe('init', function() {
        it('must set initial state', function() {
            expect(agentsStore.getState().agents.length).toEqual(0);
        });
    });


    describe('dispatched AGENTS_FETCH_SUCCESS', function() {
        var agent = {
            id: 'agentId'
        };


        beforeEach(function() {
            fakeFlux.dispatcher.dispatch({
                type: C.AGENTS_FETCH_SUCCESS,
                payload: [agent]
            });
        });

        it('must set agents', function() {
            expect(agentsStore.getState().agents.length).toEqual(1);
        });

        it('must update agent if same id', function() {
            expect(agentsStore.getState().agents.length).toEqual(1);
            fakeFlux.dispatcher.dispatch({
                type: C.AGENTS_FETCH_SUCCESS,
                payload: [{
                    id: agent.id,
                    data: 'data'
                }]
            });

            expect(agentsStore.getState().agents.length).toEqual(1);
            expect(agentsStore.getState().agents[0].data).toEqual('data');
            expect(agentsStoreSpy).lastEmittedWith('change');
        });
    });

});
