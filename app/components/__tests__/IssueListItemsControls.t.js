import { Map, fromJS, OrderedMap } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import { HIGH } from '../../lib/severities';

describe('IssueListItemsControls', function() {
    let Component = null;
    let instance = null;
    let issue = null;

    let toggleStatus = null;

    beforeEach(function() {
        toggleStatus = spy();

        issue = fromJS({
            id: 'some id'
        });

        mockery.registerMock('../actions/issuesActions', {
            toggleStatus
        });


        mockery.registerAllowable('../IssueListItemsControls', true);
        Component = require('../IssueListItemsControls');

        instance = TestUtils.renderIntoDocument(
            <Component issue={issue}/>
        );
    });

    describe('render', function() {
        it('should 4 icons', function() {
            byTag(instance, 'i').should.have.length(4);
        });
    });

    describe('controls', function() {
        it('should call toggleStatus action when click icon', function() {
            const node = findDOMNode(byTag(instance, 'span')[0]);

            Simulate.click(node);

            toggleStatus.should.have.been.calledWith(issue, 'confirmed');
        });
    });
});
