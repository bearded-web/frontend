import { captureException } from '../lib/raven';
export async function fetchTechsPage({ api, tree }, targetId) {
    const target = targetId;
    const skip = 0;
    const pageCursor = tree.select('targetTechsPage');
    const limit = pageCursor.select('pageSize').get();

    try {
        const data = await api.techs.list({ skip, limit, target: target });
        const techsCursor = tree.select('techs');
        data.results.forEach(t => techsCursor.update({ [t.id]: { $set: t } }));

        pageCursor.update({
            targetId: { $set: target },
            count: { $set: data.count },
            list: { $set: data.results.map(t => t.id) }
        });
    }
    catch (e) {
        captureException(e);
    }

    tree.commit();
}
