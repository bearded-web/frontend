import { captureException } from '../lib/raven';
import { MEDIUM, LOW, HIGH, INFO } from '../lib/severities';
import populate from '../lib/populate';

export async function fetchIssue({ tree, api }, issueId) {
    try {
       const issue = await api.issues.get({ issueId });
       tree.select('issues').set(issue.id, issue);
       tree.commit();
    } catch (e) {
       captureException(e);
    }
}

export async function fetchIssues({ tree, api }, filter) {
    try {
        const { results } = await api.issues.list(filter);
        populate(tree.select('issues'), results);
        tree.commit();
    } catch (e) {
        captureException(e);
    }
}

export async function increaseSeverity({ tree, api }, issueId) {
    await changeSeverity({ tree, api }, issueId, {
        [INFO]: LOW,
        [LOW]: MEDIUM,
        [MEDIUM]: HIGH
    });
}

export async function decreaseSeverity({ tree, api }, issueId) {
    await changeSeverity({ tree, api }, issueId, {
        [HIGH]: MEDIUM,
        [LOW]: INFO,
        [MEDIUM]: LOW
    });
}

export async function toggleIssueStatus({ tree, api }, issueId, statusName) {
    const cursor = tree.select('issues', issueId);
    const issue = tree.select('issues', issueId).get();
    if (!issue) return;
    const status = !issue[statusName];
    cursor.set(statusName, status);
    tree.commit();
    try {
        await api.issues.update({
            issueId,
            body: { [statusName]: status }
        });
    }
    catch(e) {
        captureException(e);
        cursor.set(statusName, !status);
        tree.commit();
    }
}

// Private

async function changeSeverity({ tree, api }, issueId, modifierMap) {
    const cursor = tree.select('issues', issueId);
    const issue = cursor.get();
    if (!issue) return;
    const { id, severity } = issue;
    const newSeverity = modifierMap[severity] || null;
    if (!newSeverity) return;
    tree.select('issues', id, 'severity').set(newSeverity);
    tree.commit();
    try {
        await api.issues.update({ issueId: id, body: {
            severity: newSeverity
        } });
    } catch (e) {
        tree.select('issues', id, 'severity').set(severity);
    }
    tree.commit();
}
