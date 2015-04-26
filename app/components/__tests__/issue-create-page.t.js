'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { fromJS } from 'immutable';

describe('IssueCreatePage', function() {
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
        mockery.registerMock('../actions/issues.actions', {
            changeEditableIssue,
            saveEditableIssue
        });

        mockery.registerMock('../stores/issue-create.store', createStoreMock({
            issue: issue
        }));

        mockery.registerMock('./issue-create-form', MockComponent);

        mockery.registerAllowable('../issue-create-page', true);
        Component = require('../issue-create-page');

        instance = TestUtils.renderIntoDocument(
            <Component/>
        );
    });

    describe('render', () => {
        it('should pass issue to form', () => {
            byType(instance, MockComponent)[0].props.issue
                .should.be.eql(issue);
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
