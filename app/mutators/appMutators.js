export function handleMeData({ tree }, { projects }) {
    const cursor = tree.select('projects');

    //TODO extract merge method
    projects.forEach(t => cursor.update({ [t.id]: { $set: t } }));

    tree.commit();
}
