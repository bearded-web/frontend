import { spy, mock } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';
import { Map, fromJS } from 'immutable';
import { HIGH, MEDIUM, LOW, INFO } from '../../lib/severities';

describe('issuesActions', function() {
    const summary = 'summary text';
    const target = 'targetId';
    const statusName = 'confirmed';
    const id = 'some id';
    const data = {
        results: [
            { id: 'id1', desc: 'desc 1' }
        ]
    };
    const targetId = 'targetId1';
    const editedIssue = fromJS({
        summary: 'test summary',
        vulnType: 0
    });
    const errorMessage = 'error message';

    let actions = null;
    let loadForTarget = null;
    let dispatch = null;
    let apiMock = null;
    let issuesApi = null;

    beforeEach(() => {

        const issues = { then: (f) => f(data) };

        issuesApi = {
            list: () => false,
            update: () => ({
                catch: a => a()
            }),
            create: (i) => new FakePromise(true, true, i.body, {
                data: { Message: errorMessage }
            })
        };

        spy(issuesApi, 'update');
        spy(issuesApi, 'create');

        apiMock = mock(issuesApi);
        apiMock.expects('list').once().returns(issues);
        mockery.registerMock('../lib/api3', {
            issues: apiMock.object
        });

        mockery.registerMock('../router', {
            get: () => ({
                transitionTo: spy()
            })
        });

        dispatch = spy();
        mockery.registerMock('../lib/disp', {
            dispatch: dispatch
        });

        mockery.registerMock('../stores/issue-create.store', {
            getState: () => ({
                issue: editedIssue
            })
        });

        mockery.registerAllowable('../stores/issuesListStore', true);
        mockery.registerAllowable('./issues.store', true);
        mockery.registerAllowable('../issuesActions', true);
        actions = require('../issuesActions');
        loadForTarget = actions.loadForTarget;
    });

    //TODO test fetchOne

    describe('loadForTarget', function() {
        it('should dispatch ISSUES_FETCH_START', function() {
            loadForTarget({ target: targetId });

            dispatch.firstCall.calledWith(C.ISSUES_FETCH_START, { targetId });
        });
        it('should dispatch new issues from api', function() {
            const target = 'targetId1';

            loadForTarget({ target });

            dispatch.secondCall.calledWith(C.ISSUES_FETCH_SUCCESS, data);

            apiMock.verify();
        });
    });

    describe('updateFilter', function() {
        it('should dispatch ISSUES_UPDATE_FILTER with new filter', function() {
            const filter = Map();

            actions.updateFilter(filter);

            dispatch.should.be.calledWith(C.ISSUES_UPDATE_FILTER, filter);
        });
    });

    describe('updateSort', function() {
        it('should dispatch ISSUES_UPDATE_SORT with new sortBy', function() {
            const sortBy = 'created';

            actions.updateSort(sortBy);

            dispatch.should.be.calledOnce;
            dispatch.should.be.calledWith(C.ISSUES_UPDATE_SORT, sortBy);
        });
    });

    describe('toggleStatus', function() {

        const issue = fromJS({
            id,
            [statusName]: false
        });

        beforeEach(() => {
            actions.toggleStatus(issue, statusName);
        });

        it('should call api.issues.update with new status', function() {
            issuesApi.update.should.have.been.calledWithMatch({
                issueId: id,
                body: { [statusName]: true }
            });
        });

        it('should dispatch ISSUE_UPDATE_START', function() {
            dispatch.should.have.been.calledWith(C.ISSUE_UPDATE_START, {
                id,
                [statusName]: true
            });
        });

        it('should dispatch ISSUE_UPDATE_FAIL on api error', function() {
            dispatch.args[1].should.be.eql([
                C.ISSUE_UPDATE_FAIL, {
                    id,
                    [statusName]: false
                }
            ]);
        });
    });


    describe('increaseSeverity', () => {
        const issue = fromJS({
            id,
            summary,
            target,
            severity: MEDIUM
        });
        it('should call api.issues.update with new HIGH severity', () => {
            actions.increaseSeverity(issue);

            issuesApi.update.should.have.been.calledWithMatch({
                issueId: id,
                body: { severity: HIGH, summary, target }
            });
        });
        it('should call api.issues.update with new MEDIUM severity', () => {
            const issue = fromJS({
                id,
                summary,
                target,
                severity: LOW
            });
            actions.increaseSeverity(issue);

            issuesApi.update.should.have.been.calledWithMatch({
                issueId: id,
                body: { severity: MEDIUM, summary, target }
            });
        });
        it('should call api.issues.update with new LOW severity', () => {
            const issue = fromJS({
                id,
                summary,
                target,
                severity: INFO
            });
            actions.increaseSeverity(issue);

            issuesApi.update.should.have.been.calledWithMatch({
                issueId: id,
                body: { severity: LOW, summary, target }
            });
        });
        it('should not call api.issues.update if HIGH severity', () => {
            const issue = fromJS({
                id,
                summary,
                target,
                severity: HIGH
            });
            actions.increaseSeverity(issue);

            issuesApi.update.should.have.not.been.called;
        });

        it('should dispatch ISSUE_UPDATE_START', function() {
            actions.increaseSeverity(issue);

            dispatch.should.have.been.calledWith(C.ISSUE_UPDATE_START, {
                id,
                severity: HIGH
            });
        });

        it('should dispatch ISSUE_UPDATE_FAIL on api error', function() {
            actions.increaseSeverity(issue);
            dispatch.secondCall.should.have.been.calledWith(
                C.ISSUE_UPDATE_FAIL,
                {
                    id,
                    severity: MEDIUM
                }
            );
        });

    });
    describe('decreaseSeverity', () => {
        const issue = fromJS({
            id,
            severity: MEDIUM
        });
        it('should call api.issues.update with new severity', () => {
            actions.decreaseSeverity(issue);

            issuesApi.update.should.have.been.calledWithMatch({
                issueId: id,
                body: { severity: LOW }
            });
        });

        it('should call api.issues.update with new severity', () => {
            const issue = fromJS({
                id,
                severity: HIGH
            });
            actions.decreaseSeverity(issue);

            issuesApi.update.should.have.been.calledWithMatch({
                issueId: id,
                body: { severity: MEDIUM }
            });
        });

        it('should call api.issues.update with new severity', () => {
            const issue = fromJS({
                id,
                severity: LOW
            });
            actions.decreaseSeverity(issue);

            issuesApi.update.should.have.been.calledWithMatch({
                issueId: id,
                body: { severity: INFO }
            });
        });

        it('should not call api.issues.update if LOW severity', () => {
            const issue = fromJS({
                id,
                severity: INFO
            });
            actions.decreaseSeverity(issue);

            issuesApi.update.should.have.not.been.called;
        });

        it('should dispatch ISSUE_UPDATE_START', function() {
            actions.decreaseSeverity(issue);

            dispatch.should.have.been.calledWith(C.ISSUE_UPDATE_START, {
                id,
                severity: LOW
            });
        });

        it('should dispatch ISSUE_UPDATE_FAIL on api error', function() {
            actions.decreaseSeverity(issue);
            dispatch.secondCall.should.have.been.calledWith(
                C.ISSUE_UPDATE_FAIL,
                {
                    id,
                    severity: MEDIUM
                }
            );
        });
    });

    describe('changeEditableIssue', () => {
        it('should dispatch ISSUE_EDIT_CHANGE when called', () => {
            const issue = fromJS({
                summary: '1'
            });
            actions.changeEditableIssue(issue);
            dispatch.should.have.been.calledWith(C.ISSUE_EDIT_CHANGE, { issue });
        });
    });

    describe('saveEditableIssue', () => {
        const target = 'some target id';

        it('should dispatch ISSUE_CREATE_START', () => {
            actions.saveEditableIssue();

            dispatch.should.have.been.calledWith(C.ISSUE_CREATE_START);
        });

        it('should call api.issues.create with issue from store', () => {
            actions.saveEditableIssue();

            issuesApi.create.should.have.been.calledWith({ body: editedIssue.toJS() });
        });

        it('should dispatch ISSUE_CREATE_SUCCESS when server respond ok', async function() {
            await actions.saveEditableIssue();

            dispatch.secondCall.args.should.be.eql([C.ISSUE_CREATE_SUCCESS, {
                issue: editedIssue.toJS()
            }]);
        });

        it('should dispatch ISSUE_CREATE_FAIL with error message', async function() {
            mockery.deregisterAllowable('../issuesActions');
            mockery.deregisterMock('../lib/api3');
            const api = {
                create: () => Promise.reject({
                    data: { Message: errorMessage }
                })
            };
            spy(api, 'create');
            mockery.registerMock('../lib/api3', {
                issues: api
            });
            mockery.registerAllowable('../issuesActions', true);
            actions = require('../issuesActions');

            await actions.saveEditableIssue();

            dispatch.secondCall.args.should.be.eql([C.ISSUE_CREATE_FAIL, {
                message: errorMessage
            }]);
        });

        it('should merge target before save', async function() {

            await actions.saveEditableIssue({ target });

            const issue = editedIssue.toJS();
            issue.target = target;
            issuesApi.create.should.have.been.calledWith({ body: issue });
        });


        it('should convert vulnType from string', () => {
            const summary = 'some summary';

            mockery.deregisterMock('../stores/issue-create.store');
            mockery.registerMock('../stores/issue-create.store', {
                getState: () => ({
                    issue: fromJS({
                        summary,
                        vulnType: '12'
                    })
                })
            });

            mockery.deregisterAllowable('../issuesActions');
            mockery.registerAllowable('../issuesActions', true);
            actions = require('../issuesActions');

            actions.saveEditableIssue({ target });
            issuesApi.create.should.have.been.calledWith({
                body: {
                    target,
                    summary,
                    vulnType: 12
                }
            });
        });
    });
});
