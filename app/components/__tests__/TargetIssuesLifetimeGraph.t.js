import { spy } from 'sinon';
import moment from 'moment';
import testTree from 'react-test-tree';
import TargetIssuesLifetimeGraph from '../TargetIssuesLifetimeGraph';

describe('TargetIssuesLifetimeGraph', function() {
    const targetId = 'target id';
    const issue = {
        id: 'issue id',
        created: moment().format(),
        target: targetId
    };
    const issue2 = {
        id: 'issue 2 id',
        created: moment().format(),
        target: 'another target id'
    };
    const issues = {
        [issue.id]: issue,
        [issue2.id]: issue2
    };
    let Component = null;
    let instance = null;
    let fetchIssues = null;
    let tree = null;
    let root = null;

    beforeEach(function() {
        fetchIssues = spy();
        tree = createTree();
        Component = stubContext(TargetIssuesLifetimeGraph, {
            tree,
            router: () => null,
            api: {}
        });
        root = testTree(
            <Component issues={issues} fetchIssues={fetchIssues} targetId={targetId}/>
        );
        instance = root.cmp.cmp;
    });
    afterEach(() => {
        root.dispose();
    });

    it('should render graph with issues prop', () => {
        instance.lifetime.getProp('issues').should.be.eql([issue]);
    });


    it('should call fetchIssues', () => {
        fetchIssues.should.have.been.calledWith({
            target: targetId
        });
    });
});
