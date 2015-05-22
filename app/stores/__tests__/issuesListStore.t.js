import { is, Map, List, OrderedMap, fromJS } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';
import { HIGH, MEDIUM, LOW } from '../../lib/severities';
import moment from 'moment';
import { zipObject, pluck } from 'lodash';

describe('issuesListStore', function() {
    const targetId = 'target tId';

    let filter = null;
    let createStore = null;
    let store = null;
    let api = null;
    let handlers = null;
    let initialState = null;

    beforeEach(() => {
        filter = Map({ severity: 'all' });

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: false
        });

        createStore = spy();
        mockery.registerMock('../lib/create-store', createStore);

        mockery.registerMock('./issues.store', {
            getIssues(...ids) {
                let allIssues = [
                    { id: 'i1', summary: 'sum 1', severity: LOW },
                    { id: 'i2', summary: 'sum 2', severity: HIGH },
                    { id: 'i3', summary: 'sum 3', severity: MEDIUM },
                    { id: 'i4', summary: 'sum 4', severity: HIGH },
                    { id: 'i5', summary: 'sum 5', severity: LOW }
                ];

                allIssues.map((issue, i) => {
                    // first - old
                    issue.created = moment().add(i, 'day').format();
                });

                allIssues = zipObject(pluck(allIssues, 'id'), allIssues);


                if (!ids.length) return new OrderedMap(allIssues);

                let issues = new OrderedMap();

                issues = issues.asMutable();

                ids.forEach(function(id) {
                    issues.set(id, fromJS(allIssues[id]));
                });

                return issues.asImmutable();
            }
        });

        mockery.registerAllowable('../issuesListStore', true);
        store = require('../issuesListStore');

        api = createStore.firstCall.args[0];
        handlers = createStore.firstCall.args[1];
        initialState = createStore.firstCall.args[2];
    });


    it('must call createStore', () => {
        createStore.should.have.been.calledOnce;
    });


    describe('initial state', function() {
        it('should contain sortBy=severity', function() {
            initialState.toObject().sortBy.should.be.eql('severity');
            initialState.toObject().loading.should.be.false;
        });
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

                state = issueFetchSuccess(state, { results: [{ id }] });

                const issues = state.get('issues');

                issues.size.should.be.eql(1);
                issues.first().should.be.eql(id);
            });

            it('should set loading to false', function() {
                const id = 'testId';

                state = issueFetchSuccess(state, { results: [{ id }] });

                state.get('loading').should.be.false;
            });
        });

        describe('ISSUES_FETCH_START', () => {
            let handler = null;
            let state = null;

            before(() => {
                handler = handlers[C.ISSUES_FETCH_START];
            });

            beforeEach(() => {
                state = fromJS({
                    issues: [1, 2, 3],
                    targetId: null
                });
            });

            it('should clear list', function() {
                const targetId = 'target tId';

                state = handler(state, { target: targetId });

                const issues = state.get('issues');

                issues.size.should.be.eql(0);
            });

            it('should set targetId', function() {
                const targetId = 'target tId';

                state = handler(state, { target: targetId });

                state.get('targetId').should.be.eql(targetId);
            });

            it('should set loading to true', function() {
                handler(state, { targetId }).get('loading')
                    .should.be.eql(true);
            });
        });

        describe('ISSUES_UPDATE_FILTER', function() {
            let issuesUpdateFilter = null;
            let state = null;

            before(() => {
                issuesUpdateFilter = handlers[C.ISSUES_UPDATE_FILTER];
            });

            beforeEach(() => {
                state = Map();
            });

            it('should be binded', () => {
                issuesUpdateFilter.should.be.a('function');
            });

            it('should update filter field', function() {
                const filter = Map({ severity: 'test' });

                state = issuesUpdateFilter(state, filter);

                is(state.get('filter'), filter).should.be.true;
            });
        });

        describe('ISSUES_UPDATE_SORT', function() {
            let handler = null;
            let state = null;

            beforeEach(() => {
                handler = handlers[C.ISSUES_UPDATE_SORT];
                state = Map();
            });

            it('should update sortBy field', function() {
                const sortBy = 'created';
                state = handler(state, sortBy);

                state.get('sortBy').should.be.eql(sortBy);
            });
        });
    });
});
