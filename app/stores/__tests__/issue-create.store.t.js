'use strict';

import { is, Map, List, OrderedMap, fromJS } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';

describe('issueCreate', function() {
    let createStore = null;
    let store = null;
    let api = null;
    let handlers = null;
    let initalState = null;

    beforeEach(() => {
        createStore = spy();
        mockery.registerMock('../lib/create-store', createStore);

        mockery.registerAllowable('../issue-create.store', true);
        store = require('../issue-create.store');
        api = createStore.firstCall.args[0];
        handlers = createStore.firstCall.args[1];
        initalState = createStore.firstCall.args[2];
    });

    describe('initial state', function() {
        it('should contain issue', function() {
            initalState.get('issue').toJS().should.be.eql({
                summary: '',
                desc: '',
                references: [],
                vulnType: 0,
                confirmed: true,
                false: false,
                muted: false,
                resolved: false
            });
        });
    });

    describe('handlers', () => {
        let handler = null;

        describe('ISSUE_EDIT_CHANGE', () => {
            let state = null;

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
        });

    });

    describe('api', function() {
        //TODO add api test
    });
});
