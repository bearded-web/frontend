import { captureException } from '../lib/raven';
import populate from '../lib/populate';
import { pluck, merge } from 'lodash';

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

export async function fetchTargetsPage({ tree, api }, page = 1, filter) {
    const cursor = tree.select('targetsPage');
    const pageSize = cursor.get('pageSize');
    try {
        const { results, count } = await api.targets.list(merge({
            skip: pageSize * (page - 1),
            limit: pageSize
        }, filter));
        populate(tree.select('targets'), results);
        cursor.set('list', pluck(results, 'id'));
        cursor.set('count', count);
        tree.commit();
    } catch (e) {
        captureException(e);
    }
}
