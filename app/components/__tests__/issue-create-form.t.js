'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { fromJS } from 'immutable';

describe('IssueCreateForm', function() {
    const issue = fromJS({
        summary: 'issue summary'
    });

    let Component = null;
    let instance = null;
    let onChange = null;

    beforeEach(function() {
        mockery.registerAllowable('../issue-create-form', true);
        Component = require('../issue-create-form');

        onChange = spy();
        instance = TestUtils.renderIntoDocument(
            <Component issue={issue} onChange={onChange}/>
        );
    });

    describe('render', () => {
        it('should render summary with value', () => {
            nodeByTag(instance, 'input')[0].value
                .should.be.eql(issue.get('summary'));
        });
    });

    describe('onFieldChange', () => {
        it('should call props.onChange if field changed', () => {
            const newSummary = 'new summary';
            const summary = nodeByTag(instance, 'input')[0];

            Simulate.change(summary, { target: { value: newSummary } });

            onChange.firstCall.args[0].get('summary')
                .should.be.eql(newSummary);
        });
    });
});
