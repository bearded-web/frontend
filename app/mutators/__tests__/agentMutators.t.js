import { spy } from 'sinon';
import { fetchAgents, approveAgent } from '../agentMutators';

describe('agentMutators', () => {
    let tree = null;
    let api = null;
    let agent = null;

    beforeEach(() => {
        agent = { id: 'agent id', status: 'registered' };
        tree = createTree();
        api = {
            agents: {}
        };
        api.agents.list = spy(() => Promise.resolve({ results: [agent] }));
        api.agents.approve = spy(() => Promise.resolve({
            id: agent.id,
            status: 'approved'
        }));
    });

    describe('fetchAgents', () => {
        it('should call api', async function() {
            await fetchAgents({ tree, api });
            api.agents.list.should.have.been.calledOnce;
        });

        it('should populate agents', async function() {
            await fetchAgents({ tree, api });
            tree.select('agents', agent.id).get().should.be.eql(agent);
        });
    });

    describe('approveAgent', () => {
        it('should call api', async function() {
            await approveAgent({ tree, api }, agent.id);
            api.agents.approve.should.have.been.calledWith({
                'agent-id': agent.id,
                body: {}
            });
        });

        it('should update agent', async function() {
            tree.select('agents').set(agent.id, agent);
            tree.commit();
            await approveAgent({ tree, api }, agent.id);
            tree.select('agents', agent.id).get().should.be.eql({
                id: agent.id,
                status: 'approved'
            });
        });
    });
});
