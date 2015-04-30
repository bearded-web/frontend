'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { fromJS } from 'immutable';
import { last } from 'lodash';

describe('IssueCreateForm', function() {
    const issue = fromJS({
        summary: 'issue summary',
        references: []
    });

    let Component = null;
    let instance = null;
    let onChange = null;

    beforeEach(function() {
        mockery.registerMock('./vulns-select-container', MockComponent);

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

        describe.skip('loading', () => {
            beforeEach(function() {
                instance = TestUtils.renderIntoDocument(
                    <Component loading issue={issue} onChange={onChange}/>
                );
            });

            it('should disable submit btn if loading', () => {
                const button = last(nodeByTag(instance, 'button'));
                should.exist(button.getAttribute('disabled'));
            });
            it('should disable summary input if loading', () => {
                const node = nodeByTag(instance, 'input')[0];
                should.exist(node.getAttribute('disabled'));
            });
            it('should disable desc textarea if loading', () => {
                const node = nodeByTag(instance, 'textarea')[0];
                should.exist(node.getAttribute('disabled'));
            });
        });

        it('should render error', () => {
            const error = 'some error';

            instance = TestUtils.renderIntoDocument(
                <Component error={error} issue={issue} onChange={onChange}/>
            );

            last(nodeByClass(instance, 'text-danger')).innerHTML
                .should.contain(error);
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

        it('should call props.onChange if field changed', () => {
            const newDesc = 'new desc';
            const desc = nodeByTag(instance, 'textarea')[0];

            Simulate.change(desc, { target: { value: newDesc } });

            onChange.firstCall.args[0].get('desc')
                .should.be.eql(newDesc);
        });
    });
});
