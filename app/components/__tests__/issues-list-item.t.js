'use strict';

import { Map, fromJS, OrderedMap } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import { HIGH } from '../../lib/severities';

describe('IssuesListItem', function() {
    const id1 = 'id1';
    const desc1 = 'desc 1';
    const issue = Map({ id: id1, summary: desc1, severity: HIGH });


    let IssuesListItem = null;
    let issuesListItem = null;
    let transitionTo = null;


    beforeEach(function() {
        transitionTo = spy();

        mockery.registerMock('../actions/issues.actions', {
            toggleStatus: spy()
        });

        mockery.registerAllowable('../issues-list-item', true);
        IssuesListItem = require('../issues-list-item');

        const Subject = stubRouterContext(IssuesListItem, { issue }, {
            transitionTo: transitionTo
        });
        issuesListItem = TestUtils.renderIntoDocument(
            <Subject/>
        );
    });

    describe('render', function() {
        it('should render title with summary', function() {
            byTag(issuesListItem, 'h3')[0].getDOMNode().textContent
                .should.be.eql(desc1);
        });
    });

    describe('onClick', function() {
        it('must go to issue page', function() {
            Simulate.click(findDOMNode(issuesListItem));

            transitionTo.should.be.calledWith('issue', { issueId: id1 });
        });
    });
});
