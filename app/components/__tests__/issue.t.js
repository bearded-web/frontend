import { fromJS } from 'immutable';
import mockery from 'mockery';

describe.skip('Issue', function() {
    const summary = 'Some cool issue';

    let issue = null;
    let Component = null;
    let instance = null;

    beforeEach(function() {
        issue = fromJS({
            summary,
            vector: {},
            activities: [{}]
        });
        mockery.registerMock('./IssueComments', MockComponent);
        mockery.registerMock('./references', MockComponent);
        mockery.registerMock('./issue-activities', MockComponent);
        mockery.registerMock('./vector', MockComponent);
        mockery.registerMock('./issue-controls', MockComponent);
        mockery.registerAllowable('../issue', true);
        Component = require('../issue');
        instance = TestUtils.renderIntoDocument(
            <Component issue={issue}/>
        );
    });

    describe('render', function() {
        it('should render summary', function() {
            findDOMNode(instance).innerHTML.should.contain(summary);
        });
    });
});
