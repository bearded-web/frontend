'use strict';

import { Map, fromJS, OrderedMap } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import { HIGH } from '../../lib/severities';
import IssueActivities from '../issue-activities';

describe('Issue_', function() {
    const summary = 'Some cool issue';

    let issue = null;
    let Component = null;
    let instance = null;

    beforeEach(function() {
        issue = fromJS({
            summary,
            activities: [{}]
        });

        mockery.registerAllowable('../issue', true);
        Component = require('../issue');

        instance = TestUtils.renderIntoDocument(
            <Component issue={issue}/>
        );
    });

    describe('render', function() {
        it('should contain IssueActivities', function() {
            byType(instance, IssueActivities).should.have.length(1);
        });

        it('should render summary', function() {
            findDOMNode(instance).innerHTML.should.contain(summary);
        });
    });
});
