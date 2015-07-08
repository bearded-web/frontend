import { captureException } from '../lib/raven';
import populate from '../lib/populate';
import { cloneDeep } from 'lodash';

export async function fetchTechs({ tree, api }, filter) {
    try {
        const { results } = await api.techs.list(filter);
        populate(tree.select('techs'), results);
        tree.commit();
    } catch (e) {
        captureException(e);
    }
}

export async function fetchTechsPage({ api, tree }, targetId) {
    const target = targetId;
    const skip = 0;
    const pageCursor = tree.select('targetTechsPage');
    const limit = pageCursor.select('pageSize').get();

    try {
        const { results, count } = await api.techs.list({ skip, limit, target: target });
        populate(tree.select('techs'), results);

        pageCursor.update({
            targetId: { $set: target },
            count: { $set: count },
            list: { $set: results.map(t => t.id) }
        });
        tree.commit();
    }
    catch (e) {
        captureException(e);
    }
}

export async function updateTechStatus({ tree, api }, techId, status) {
    const cursor = tree.select('techs', techId);
    const oldStatus = cursor.get('status');
    const tech = cloneDeep(cursor.get());
    cursor.set('status', status);
    tree.commit();
    tech.status = status;
    delete tech.categories;
    try {
        const data = await api.techs.update({
            techId,
            body: tech
        });
        cursor.set(data);
    } catch (e) {
        captureException(e);
        cursor.set('status', oldStatus);
    }
    tree.commit();
}
