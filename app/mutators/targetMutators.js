import { captureException } from '../lib/raven';

export async function deleteTarget({ tree, api, router }, targetId) {
    const target = tree.get('targets', targetId);
    if (!target) return;
    tree.select('targets').unset(targetId);
    tree.commit();
    try {
        await api.targets.delete({ 'target-id': targetId });
        router.transitionTo('overview');
    } catch (e) {
        captureException(e);
        if (e && e.status !== 404) {
            tree.select('targets').set(target.id, target);
            tree.commit();
        }
    }
}
