'use strict';

import { Map, fromJS } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';

describe('issuesStore', function() {
    const id = 'some id';
    const summary = 'test semmary';

    let createStore = null;
    let store = null;
    let api = null;
    let handlers = null;
    let initalState = null;
    let handler = null;
    let state = null;

    beforeEach(() => {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: false
        });

        createStore = spy();
        mockery.registerMock('../lib/create-store', createStore);

        mockery.registerAllowable('../issues.store', true);
        store = require('../issues.store');

        api = createStore.firstCall.args[0];
        handlers = createStore.firstCall.args[1];
        initalState = createStore.firstCall.args[2];
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

        describe('ISSUE_UPDATE_START', function() {

            before(() => {
                handler = handlers[C.ISSUE_UPDATE_START];
            });

            beforeEach(() => {
                state = fromJS({
                    [id]: {
                        id,
                        confirmed: false
                    }
                });
            });

            it('should merge issue', function() {
                state = handler(state, {
                    id,
                    confirmed: true
                });

                state.getIn([id, 'confirmed']).should.be.eql.true;
            });
        });

        describe('ISSUE_CREATE_SUCCESS', () => {
            let issue = null;

            beforeEach(() => {
                issue = {
                    id,
                    summary
                };
                handler = handlers[C.ISSUE_CREATE_SUCCESS];
                state = fromJS({});
            });

            it('should add new issue', () => {
                state = handler(state, { issue });
                state.get(id).get('summary')
                    .should.be.eql(summary);
            });
        });
    });

    describe('api', function() {
        describe('.getIssues()', function() {
            const id = 'someId';
            const desc = 'desc 1';
            const id2 = 'someId2';
            const desc2 = 'desc 2';
            const id3 = 'someId3';
            const desc3 = 'desc 3';
            const store = {
                getState() {
                    return {
                        [id]: Map({ id, desc }),
                        [id2]: Map({ id: id2, desc: desc2 }),
                        [id3]: Map({ id: id3, desc: desc3 })
                    };
                }
            };

            it('should return issues array', function() {
                const id = 'someId';
                const desc = 'desc 1';
                const store = {
                    getState() {
                        return {
                            [id]: Map({ id, desc })
                        };
                    }
                };

                api.getIssues.bind(store)(id).first().get('desc')
                    .should.be.eql(desc);
            });


            it('should return 2 of 3', function() {
                api.getIssues.bind(store)(id, id3).size
                    .should.be.eql(2);
            });

            it('should return 3 and 2', function() {
                api.getIssues.bind(store)(id3, id2).first().get('desc')
                    .should.be.eql(desc3);
            });
        });
    });
});
