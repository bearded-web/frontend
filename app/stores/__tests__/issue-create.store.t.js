'use strict';

import { fromJS } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';

describe('issueCreateStore', function() {
    const initialStateData = {
        loading: false,
        error: '',
        issue: {
            summary: '',
            desc: '',
            severity: 'high',
            vulnType: 0,
            confirmed: true,
            false: false,
            muted: false,
            resolved: false
        }
    };

    let createStore = null;
    let store = null;
    let api = null;
    let handlers = null;
    let initialState = null;
    let handler = null;
    let state = null;

    beforeEach(() => {
        createStore = spy();
        mockery.resetCache();
        mockery.registerMock('../lib/create-store', createStore);

        mockery.registerAllowable('../issue-create.store', true);
        store = require('../issue-create.store');
        api = createStore.firstCall.args[0];
        handlers = createStore.firstCall.args[1];
        initialState = createStore.firstCall.args[2];
    });

    describe('initial state', function() {
        it('should contain issue', function() {
            initialState.toJS().should.be.eql(initialStateData);
        });
    });

    describe('handlers', () => {
        describe('ISSUE_EDIT_CHANGE', () => {

            beforeEach(() => {
                handler = handlers[C.ISSUE_EDIT_CHANGE];
            });

            beforeEach(() => {
                state = fromJS({
                    issue: {
                        summary: '1'
                    }
                });
            });

            it('should change summary', function() {
                state = handler(state, { issue: fromJS({ summary: '2' }) });

                state.getIn(['issue', 'summary']).should.be.eql('2');
            });

            it('should clear error field', () => {
                state = fromJS({
                    error: 'Some error',
                    issue: {
                        summary: '1'
                    }
                });
                state = handler(state, { issue: fromJS({ summary: '2' }) });
                state.get('error').should.be.empty;
            });
        });

        describe('ISSUE_CREATE_START', () => {
            beforeEach(() => {
                handler = handlers[C.ISSUE_CREATE_START];
                state = fromJS({ loading: false });
            });

            it('should set loading to true', () => {
                handler(state).get('loading').should.be.eql.true;
            });
        });

        describe('ISSUE_CREATE_SUCCESS', () => {
            beforeEach(() => {
                handler = handlers[C.ISSUE_CREATE_SUCCESS];
                state = fromJS({ loading: true, summary: 'hello' });
            });

            it('should set loading to false', () => {
                handler(state).get('loading').should.be.eql.false;
            });

            it('should set state to initial', () => {
                handler(state).toJS().should.be.eql(initialStateData);
            });
        });

        describe('ISSUE_CREATE_FAIL', () => {
            const message = 'error message';

            beforeEach(() => {
                handler = handlers[C.ISSUE_CREATE_FAIL];
                state = fromJS({ error: '' });
            });

            it('should set loading to false', () => {
                handler(state, { message }).get('loading').should.be.eql.false;
            });

            it('should set error message', () => {
                handler(state, { message }).get('error').should.be.eql(message);
            });
        });

    });

    describe('api', function() {
        //TODO add api test
    });
});
