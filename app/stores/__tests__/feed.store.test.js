'use strict';
describe('FeedStore', function() {
    var FluxxorTestUtils, fakeFlux, store, storeSpy, C;

    jest.dontMock('util');
    jest.dontMock('../feed.store');
    jest.dontMock('../../lib/merge-collections');


    beforeEach(function() {
        C = require('../../constants');

        FluxxorTestUtils = require('fluxxor-test-utils');
        FluxxorTestUtils.extendJasmineMatchers(this);
        // now our jasmine matchers are available

        var AgentsStore = require('../feed.store');
        fakeFlux = FluxxorTestUtils.fakeFlux({ AgentsStore: new AgentsStore() });
        // now we have a FakeFlux instance that has .stores.MyStore

        store = fakeFlux.store('AgentsStore');
        // easier access to my store instance

        storeSpy = fakeFlux.makeStoreEmitSpy('AgentsStore');
        // now all our this.emit() calls from within the store are captured
    });


    describe('.getProjectFeed()', function() {
        it('must return empty array if no items', function() {
            expect(store.getProjectFeed('somep').length).toEqual(0);
        });

        it('must return only project items', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.FEED_FETCH_SUCCESS,
                payload: [
                    { id: '1', data: 'data', project: '1' },
                    { id: '2', data: 'data', project: '1' },
                    { id: '3', data: 'data', project: '2' }
                ]
            });

            expect(store.getProjectFeed('1').length).toEqual(2);
            expect(store.getProjectFeed('2').length).toEqual(1);
        });
    });


    describe('.getTargetFeed()', function() {
        it('must return only target items', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.FEED_FETCH_SUCCESS,
                payload: [
                    { id: '1', data: 'data', target: '1' },
                    { id: '2', data: 'data', target: '1' },
                    { id: '3', data: 'data', target: '2' }
                ]
            });

            expect(store.getTargetFeed('1').length).toEqual(2);
            expect(store.getTargetFeed('2').length).toEqual(1);
        });
    });

    describe('.getFeedFor()', function() {
        it('must return empty array if no source', function() {
            expect(store.getFeedFor().length).toEqual(0);
        });

        it('must return feed for target', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.FEED_FETCH_SUCCESS,
                payload: [
                    { id: '1', data: 'data', target: '1' },
                    { id: '2', data: 'data', target: '1' },
                    { id: '3', data: 'data', target: '2' }
                ]
            });

            expect(store.getFeedFor('target', { id: '1' }).length).toEqual(2);
            expect(store.getFeedFor('target', { id: '2' }).length).toEqual(1);
        });

        it('must return feed for project', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.FEED_FETCH_SUCCESS,
                payload: [
                    { id: '1', data: 'data', target: '1', project: '0' },
                    { id: '2', data: 'data', target: '1', project: '1' },
                    { id: '3', data: 'data', target: '2', project: '2' }
                ]
            });

            expect(store.getFeedFor('project', { id: '1' }).length).toEqual(1);
            expect(store.getFeedFor('project', { id: '2' }).length).toEqual(1);
        });

        it('must return empty array if wrong type', function() {
            expect(store.getFeedFor('some', { id: '1' }).length).toEqual(0);
        });

        it('must return feed if store param is store.id', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.FEED_FETCH_SUCCESS,
                payload: [
                    { id: '1', data: 'data', target: '1', project: '0' },
                    { id: '2', data: 'data', target: '1', project: '1' },
                    { id: '3', data: 'data', target: '2', project: '2' }
                ]
            });

            expect(store.getFeedFor('project', '1').length).toEqual(1);
            expect(store.getFeedFor('project', '2').length).toEqual(1);
        });
    });


    describe('FEED_FETCH_SUCCESS', function() {
        it('must update duplicates', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.FEED_FETCH_SUCCESS,
                payload: [
                    { id: '1', data: 'data', project: '1' }
                ]
            });

            expect(store.getProjectFeed('1')[0].data).toEqual('data');

            fakeFlux.dispatcher.dispatch({
                type: C.FEED_FETCH_SUCCESS,
                payload: [
                    { id: '1', data: 'new data', project: '1' }
                ]
            });

            expect(store.getProjectFeed('1')[0].data).toEqual('new data');
        });

        it('must update duplicates created by scan', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.SCANS_CREATION,
                payload: { status: 'success', scan: { id: '11', target: '1' } }
            });

            expect(store.getFeedFor('target', '1').length).toEqual(1);

            fakeFlux.dispatcher.dispatch({
                type: C.FEED_FETCH_SUCCESS,
                payload: [
                    { id: '1', data: 'data', target: '1', type: 'scan', scan: { id: '11' } }
                ]
            });

            expect(store.getFeedFor('target', '1').length).toEqual(1);
            expect(store.getFeedFor('target', '1')[0].data).toEqual('data');
        });
    });

    describe('SCANS_CREATION', function() {
        it('must not create item if no success', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.SCANS_CREATION,
                payload: { status: 'error', scan: { id: '11', target: '1' } }
            });

            expect(store.getTargetFeed('1').length).toEqual(0);
        });

        it('must create item with scan', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.SCANS_CREATION,
                payload: { status: 'success', scan: { id: '11', target: '1' } }
            });

            expect(store.getTargetFeed('1')[0].id).toEqual(null);
            expect(store.getTargetFeed('1')[0].scan.id).toEqual('11');
        });

        it('must not create item with scan if exist', function() {
            fakeFlux.dispatcher.dispatch({
                type: C.SCANS_CREATION,
                payload: { status: 'success', scan: { id: '11', target: '1' } }
            });

            fakeFlux.dispatcher.dispatch({
                type: C.SCANS_CREATION,
                payload: { status: 'success', scan: { id: '11', target: '1' } }
            });
            expect(store.getTargetFeed('1').length).toEqual(1);
        });
    });

});
