import { pluck, values } from 'lodash';
import { captureException } from '../lib/raven';
import localStorage from '../lib/local-storage';

export async function handleMeData({ tree, api }, { projects, user }) {
    const cursor = tree.select('projects');
    populate(cursor, projects);

    //if no project in list, change current
    let currentProjectId = tree.get('currentProjectId');
    if (!cursor.get(currentProjectId)) {
        currentProjectId = values(projects)[0].id;
        tree.set('currentProjectId', currentProjectId);
        localStorage.setItem('currentProjectId', currentProjectId);
    }

    tree.select('users').set(user.id, user);
    tree.select('currentUserId').set(user.id);
    tree.commit();
    try {
        const { results } = await api.targets.list({
            /* eslint-disable camelcase */
            project_in: pluck(projects, 'id').join(',')
            /* eslint-enable camelcase */
        });
        populate(tree.select('targets'), results);
        tree.commit();
    } catch (e) {
        captureException(e);
    }
}

function populate(cursor, data) {
    data.forEach(t => cursor.update({ [t.id]: { $set: t } }));
}
