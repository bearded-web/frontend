'use strict';

import { is, Map, List, OrderedMap, fromJS } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';
import mergeToState from '../../lib/mergeToState';

describe('vulns', function() {
    let createStore = null;
    let store = null;
    let api = null;
    let handlers = null;
    let initialState = null;
    let vulns = null;

    beforeEach(() => {
        vulns = [
            { id: 1, title: '1', severity: 'high' },
            { id: 2, title: '2', severity: 'low' }
        ];

        createStore = spy();
        mockery.registerMock('../lib/create-store', createStore);

        mockery.registerAllowable('../vulns.store', true);
        store = require('../vulns.store');

        api = createStore.firstCall.args[0];
        handlers = createStore.firstCall.args[1];
        initialState = createStore.firstCall.args[2];
    });


    describe('initial state', function() {
        it('should contain ...', function() {
            initialState.toJS().should.be.eql({});
        });
    });

    describe('handlers', () => {
        let handler = null;
        let state = null;

        describe(C.VULNS_FETCH_SUCCESS, () => {
            beforeEach(() => {
                handler = handlers[C.VULNS_FETCH_SUCCESS];
                state = Map();
            });

            it('should populate state with vulns', function() {
                handler(state, { vulns }).toJS().should.be.eql({
                    [vulns[0].id]: vulns[0],
                    [vulns[1].id]: vulns[1]
                });
            });
        });

    });

    describe('api', function() {
        describe('asArray()', () => {
            it('should return issues array', function() {
                let state = Map();
                state = mergeToState(state, vulns);
                const store = {
                    getRawState() {
                        return state;
                    }
                };

                const arr = api.asArray.bind(store)();
                arr.should.have.length(2);
                arr.should.be.eql(vulns);
            });
        });
        describe('asList()', () => {
            it('should return issues array', function() {
                let state = Map();
                state = mergeToState(state, vulns);
                const store = {
                    getRawState() {
                        return state;
                    }
                };

                const arr = api.asList.bind(store)().toJS();
                arr.should.have.length(2);
                arr.should.be.eql(vulns);
            });
        });
    });
});
