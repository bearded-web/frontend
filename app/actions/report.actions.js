import dispatcher from '../lib/dispatcher';
import { scans } from '../lib/api3';
import { extractor } from '../lib/helpers';
import C from '../constants';
import { captureException } from '../lib/raven';


export async function fetchScanReports(scan) {
    try {
        let reports = await scans.reports(scan);

        reports = extractor(reports);

        reports[1].multi[0].issues[0].severity = 'info';

        dispatchReports(reports);
    }
    catch(e) {
        captureException(e);
    }
}

export function selectSeverity(severity) {
    dispatcher.dispatch(C.REPORTS_SEVERITY_SELECT, severity);
}

function dispatchReports(reports) {
    dispatcher.dispatch(C.REPORTS_FETCH, {
        status: 'success',
        reports: reports
    });
}
