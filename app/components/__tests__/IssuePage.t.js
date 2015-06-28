import { spy } from 'sinon';
import mockery from 'mockery';
import Baobab from 'baobab';
import testTree from 'react-test-tree';
import dataTree, { facets } from '../../lib/dataTree';
import { LOW, MEDIUM, HIGH } from '../../lib/severities';

describe('IssuePage', function() {
    const issueId = 'seom issue id';
    const issue = {
        id: issueId,
        summary: 'issue summary',
        vector: {},
        severity: HIGH
    };

    let fetchIssue = null;
    let instance = null;
    let Component = null;

    beforeEach(function() {
        fetchIssue = spy();

        mockery.registerAllowable('../IssuePage', true);
        Component = stubContext(require('../IssuePage'), {
            tree: new Baobab(dataTree, { facets }),
            api: {},
            router: () => ({})
        });
        instance = testTree(<Component
            params={{issueId}}
            issue={issue}
            fetchIssue={fetchIssue}
            />);
        instance = instance.cmp.cmp;
    });

    it('should set document title', () => {
       document.title.should.contain(issue.summary);
    });
    it('should call fetchIssue with issueId', () => {
        fetchIssue.should.have.been.calledWith(issueId);
    });
    it('should pass immutable issue to issue', () => {
        instance.issue.getProp('issue').toJS().should.be.eql(issue);
    });
});
