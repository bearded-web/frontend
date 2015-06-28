import { captureException } from '../lib/raven';
import { findIndex, find, clone, values } from 'lodash';

export async function setCurrentProject({ tree, api }, projectId) {
    if (!projectId) {
        projectId = values(tree.select('projects').get())[0].id;
    }
    tree.select('currentProjectId').set(projectId);
    tree.commit();

    const usersIds = tree
        .select('projects', projectId)
        .get()
        .members
        .map(member => member.user);

    const usersCursor = tree.select('users');
    const targetsCursor = tree.select('targets');

    try {
        const [data, targetsData] = await Promise.all([
            api.users.list({ id_in: usersIds.join(',') }),
            api.targets.list({ project: projectId })
        ]);

        data.results.forEach(t => usersCursor.update({ [t.id]: { $set: t } }));
        targetsData.results.forEach(t => targetsCursor.update({ [t.id]: { $set: t } }));
    }
    catch (e) {
        //TODO add message to user or similar
        captureException(e);
    }

    tree.commit();
}

export async function addMember({ tree, api }, projectId, userId) {
    const cursor = tree.select('projects', projectId, 'members');

    // if already added
    if (find(cursor.get(), { user: userId })) return;

    cursor.push({ user: userId });
    tree.commit();

    try {
        await api.projects.membersCreate({
            'project-id': projectId,
            body: {
                user: userId
            }
        });
    }
    catch(e) {
        captureException(e);

        // TODO check if error about already exist
        // revert
        cursor.apply(m => m.filter(m => m.user !== userId));
        tree.commit();
    }
}

export async function deleteMember({ tree, api }, projectId, userId) {
    const cursor = tree.select('projects', projectId, 'members');
    let members = cursor.get();

    const index = findIndex(members, { user: userId });
    if (index === -1) return;

    const [member] = members.splice(index, 1);
    cursor.set(clone(members));
    tree.commit();

    try {
        await api.projects.membersDelete({
            'project-id': projectId,
            'user-id': userId
        });
    }
    catch (e) {
        captureException(e);

        // revert state
        let members = cursor.get();
        members.splice(index, 0, member);
        cursor.set(clone(members));
        tree.commit();
    }
}
