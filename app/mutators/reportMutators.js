import { captureException } from '../lib/raven';

export async function fetchScanReports({ tree, api }, scanId) {
    const reportsCursor = tree.select('reports');

    tree.select('scanReportsPage', 'scanId').set(scanId);
    tree.commit();

    try {
        const { results } = await api.scans.reports({ 'scan-id': scanId });
        results.forEach(t => reportsCursor.update({ [t.id]: { $set: t } }));
        tree.commit();
    }
    catch(e){
        captureException(e);
    }
}
