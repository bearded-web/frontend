import { spy } from 'sinon';
import mockery from 'mockery';
import { fromJS } from 'immutable';

describe.skip('IssueCreatePage', function() {
    const issue = fromJS({
        summary: 'issue summary'
    });
    let Component = null;
    let instance = null;
    let changeEditableIssue = null;
    let saveEditableIssue = null;

    beforeEach(function() {
        changeEditableIssue = spy();
        saveEditableIssue = spy();
        mockery.registerMock('../actions/issuesActions', {
            changeEditableIssue,
            saveEditableIssue
        });

        mockery.registerMock('../stores/issue-create.store', createStoreMock({
            issue: issue,
            loading: false
        }));

        mockery.registerMock('./issue-create-form', MockComponent);

        mockery.registerAllowable('../issue-create-page', true);
        Component = require('../issue-create-page');

        const Stub = stubRouterContext(Component, {}, {
            getCurrentQuery: () => ({ target: 't' })
        });
        instance = TestUtils.renderIntoDocument(
            <Stub/>
        );
        instance = byType(instance, Component)[0];
    });

    describe('render', () => {
        it('should pass issue to form', () => {
            byType(instance, MockComponent)[0].props.issue
                .should.be.eql(issue);
        });
        it('should pass loading to form', () => {
            byType(instance, MockComponent)[0].props.loading
                .should.be.eql.false;
        });
    });

    describe('onChange', () => {
        it('should call issue action changeEditableIssue with issue', () => {
            const newIssue = issue.set('desc', 'description');

            byType(instance, MockComponent)[0].props.onChange(newIssue);

            changeEditableIssue.should.have.been.calledWith(newIssue);
        });
        it('should call issue action saveEditableIssue', () => {
            byType(instance, MockComponent)[0].props.onSubmit();

            saveEditableIssue.should.have.been.calledOnce;
        });
    });
});
