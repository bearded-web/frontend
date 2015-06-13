import { spy } from 'sinon';
import testTree from 'react-test-tree';
import AgentsPage from '../AgentsPage';

describe('AgentsPage', () => {
    const agent = {
        id: 'agent id',
        status: 'registered'
    };

    let instance = null;
    let Component = null;
    let tree = null;
    let fetchAgents = null;
    let approveAgent = null;

    beforeEach(() => {
        const agents = [agent];
        fetchAgents = spy();
        approveAgent = spy();
        tree = createTree();
        Component = stubContext(AgentsPage, {
            tree,
            api: {}
        });
        instance = testTree(
            <Component
                agents={agents}
                fetchAgents={fetchAgents}
                approveAgent={approveAgent}/>
        );
    });

    it('should call fetchAgents prop on mount', () => {
        fetchAgents.should.have.been.calledOnce;
    });

    it('should change title', () => {
        global.document.title.should.contain(iget('Agents'));
    });

    it('should render agents rows', () => {
        instance.cmp.cmp.agents.should.have.length(1);
    });

    it('should call approveAgent if button clicker', () => {
        const btn = nodeByTag(instance.cmp.cmp.agents[0].element, 'button')[0];
        Simulate.click(btn);
        approveAgent.should.have.been.calledWith(agent.id);
    });
});
