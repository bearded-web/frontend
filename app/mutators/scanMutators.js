import { captureException } from '../lib/raven';

export async function createScan({ tree, api, router }, target, project, plan) {
    try {
        const scan = await api.scans.create({
            target, project, plan
        });
        populateWithScan(tree, scan);
        router.transitionTo('target', { targetId: target });
    }
    catch (e) {
        captureException(e);
    }
}

export async function fetchScan({ tree, api }, scanId) {
    if (!scanId) {
        return;
    }

    try {
        const scan = await api.scans.get({
            'scan-id': scanId
        });
        populateWithScan(tree, scan);
    }
    catch (e) {
        captureException(e);
    }
}

function populateWithScan(tree, scan) {
    tree.select('scans').update({ [scan.id]: { $set: scan } });
    tree.commit();
}
