import { spy } from 'sinon';
import Baobab from 'baobab';
import testTree from 'react-test-tree';
import dataTree, { facets } from '../../lib/dataTree';
import { MEDIUM } from '../../lib/severities';
import IssueControls from '../IssueControls';

describe('IssueControls', function() {
    const issueId = 'seom issue id';
    const issue = {
        id: issueId,
        summary: 'issue summary',
        vector: {},
        severity: MEDIUM
    };

    let toggleIssueStatus = null;
    let increaseSeverity = null;
    let decreaseSeverity = null;
    let instance = null;
    let Component = null;

    beforeEach(function() {
        increaseSeverity = spy();
        decreaseSeverity = spy();
        toggleIssueStatus = spy();

        Component = stubContext(IssueControls, {
            tree: new Baobab(dataTree, { facets }),
            api: {},
            router: () => ({})
        });
        instance = testTree(<Component
            params={{issueId}}
            issue={issue}
            toggleIssueStatus={toggleIssueStatus}
            decreaseSeverity={decreaseSeverity}
            increaseSeverity={increaseSeverity}
            />);
        instance = instance.cmp.cmp;
    });
    it('should call increaseSeverity when button clicked', () => {
       instance.increase.click();
       increaseSeverity.should.have.been.calledWith(issueId);
    });
    it('should call decreaseSeverity when button clicked', () => {
       instance.decrease.click();
       decreaseSeverity.should.have.been.calledWith(issueId);
    });
    it('should call toggleIssueStatus when status toggled', () => {
        instance.muted.click();
        toggleIssueStatus.should.have.been.calledWith(issue.id, 'muted');
    });
});
