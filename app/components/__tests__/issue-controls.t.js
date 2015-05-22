'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { fromJS } from 'immutable';
import { MEDIUM } from '../../lib/severities';

describe('IssueControls', function() {
    const issue = fromJS({
        id: 'issueId 123',
        severity: MEDIUM
    });

    let Component = null;
    let instance = null;
    let increaseSeverity = null;
    let decreaseSeverity = null;
    let toggleStatus = null;

    beforeEach(function() {
        increaseSeverity = spy();
        decreaseSeverity = spy();
        toggleStatus = spy();
        mockery.registerMock('../actions/issuesActions', {
            increaseSeverity,
            decreaseSeverity,
            toggleStatus
        });

        mockery.registerAllowable('../issue-controls', true);
        Component = require('../issue-controls');

        instance = TestUtils.renderIntoDocument(
            <Component issue={issue}/>
        );
    });

    describe('severity', () => {
        it('should call increaseSeverity action', () => {
            const btn = nodeByTag(instance, 'button')[0];

            Simulate.click(btn);

            increaseSeverity.firstCall.args[0].get('id')
                .should.be.eql(issue.get('id'));
        });
        it('should call decreaseSeverity action', () => {
            const btn = nodeByTag(instance, 'button')[1];

            Simulate.click(btn);

            decreaseSeverity.firstCall.args[0].get('id')
                .should.be.eql(issue.get('id'));
        });
    });

    describe('status', () => {
        it('should call toggleStatus action when click btn', function() {
            const node = nodeByTag(instance, 'button')[2];

            Simulate.click(node);

            toggleStatus.should.have.been.calledWith(issue, 'confirmed');
        });
    });
});
