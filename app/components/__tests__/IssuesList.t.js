import { Map, fromJS, OrderedMap } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import { HIGH } from '../../lib/severities';

describe('IssuesList', function() {
    const id1 = 'id1';
    const id2 = 'id2';
    const desc1 = 'desc 1';
    const desc2 = 'desc 2';

    let issues = new OrderedMap();

    issues = issues
        .set(id1, Map({ id: id1, summary: desc1, severity: HIGH }))
        .set(id2, Map({ id: id2, summary: desc2, severity: HIGH }));

    let IssuesListItem = null;
    let IssuesList = null;
    let issuesList = null;


    beforeEach(function() {

        mockery.registerAllowable('../IssuesList', true);
        IssuesList = require('../IssuesList');

        issuesList = TestUtils.renderIntoDocument(
            <IssuesList issues={issues}/>
        );
    });

    //TODO add tests

});
