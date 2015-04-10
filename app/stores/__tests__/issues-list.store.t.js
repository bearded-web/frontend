'use strict';

import { Map, fromJS } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';

describe('issuesListStore', function() {
    let createStore = null;
    let store = null;
    let api = null;
    let handlers = null;

    beforeEach(() => {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: false
        });

        createStore = spy();
        mockery.registerMock('../lib/create-store', createStore);

        mockery.registerAllowable('../issues-list.store', true);
        store = require('../issues-list.store');

        handlers = createStore.firstCall.args[1];
    });

    afterEach(() => {
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

            it('should populate state.issues with ids', function() {
                const id = 'testId';

                state = issueFetchSuccess(state, [{ id }]);

                const issues = state.get('issues');

                issues.size.should.be.eql(1);
                issues.first().should.be.eql(id);
            });
        });
    });

});
