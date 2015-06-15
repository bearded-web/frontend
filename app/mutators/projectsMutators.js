import { captureException } from '../lib/raven';

export async function setCurrentProject({ tree, api }, projectId) {
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
        captureException(e);
    }

    tree.commit();
}

export function removeMember(projectId, userId) {
    return projects.membersDelete({
        'project-id': projectId,
        'user-id': userId
    }).then(function() {
        dispatch(consts.PROJECT_REMOVE_MEMBER, { userId, projectId });
    });
}
