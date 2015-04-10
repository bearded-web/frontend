'use strict';

import { Map, fromJS } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';

describe('LockScreen', function() {
    let createStore = null;
    let store = null;
    let handlers = null;

    before(() => {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: false
        });

        createStore = spy();
        mockery.registerMock('../lib/create-store', createStore);

        store = require('../issues.store');

        handlers = createStore.firstCall.args[1];
    });

    after(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('must call createStore', () => {
        createStore.should.have.been.calledOnce;
    });

    describe('handlers', () => {

        describe('ISSUES_FETCH_SUCCESS', () => {
            let issueFetchSuccess = null;
            let state = null;

            before(() => {
                issueFetchSuccess = handlers[C.ISSUES_FETCH_SUCCESS];
            });

            beforeEach(() => {
                state = Map();
            });

            it('should bind ISSUES_FETCH_SUCCESS', () => {
                issueFetchSuccess.should.be.a('function');
            });

            it('should add issues', () => {
                const id = 'some id';
                const desc = 'issue description';
                const issue = { id, desc };
                const issues = [issue];

                state = issueFetchSuccess(state, issues);

                state.getIn([id, 'desc']).should.be.eql(desc);
            });

            it('should merge issue', () => {
                const desc2 = 'desc 2';
                const issues = [{
                    id: 'id2',
                    desc: desc2
                }];

                state = fromJS({
                    id1: { id: 'id1', desc: 'desc 1' }
                });

                state = issueFetchSuccess(state, issues);

                state.size.should.be.eql(2);
                state.getIn(['id2', 'desc']).should.be.eql(desc2);
            });
        });

    });
});
