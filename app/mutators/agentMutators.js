import { captureException } from '../lib/raven';

export async function fetchAgents({ tree, api }) {

    try {
        const { results } = await api.agents.list();
        const agentsCursor = tree.select('agents');
        results.forEach(t => agentsCursor.update({ [t.id]: { $set: t } }));
        tree.commit();
    }
    catch (e) {
        captureException(e);
    }
}

export async function approveAgent({ tree, api }, agentId) {
    try {
        const agent = await api.agents.approve({
            'agent-id': agentId,
            body: {}
        });

        tree.select('agents').set(agent.id, agent);
        tree.commit();
    }
    catch (e) {
        captureException(e);
    }
}
