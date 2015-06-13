export function handleMeData({ tree }, { projects, user }) {
    const cursor = tree.select('projects');

    //TODO extract merge method
    projects.forEach(t => cursor.update({ [t.id]: { $set: t } }));

    tree.select('users').set(user.id, user);
    tree.select('currentUserId').set(user.id);

    tree.commit();
}
