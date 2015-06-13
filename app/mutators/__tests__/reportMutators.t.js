import { spy } from 'sinon';
import { fetchScanReports } from '../reportMutators';

describe('reportMutators', () => {
    let reportId;
    let report;
    let tree = null;
    let api = null;

    beforeEach(() => {
        reportId = 'report id';
        report = { id: reportId, raw: '{}' };
        tree = createTree();

        api = {
            scans: {}
        };
        api.scans.reports = spy(() => Promise.resolve({ results: [report] }));
    });

    describe('fetchScanReports', () => {
        const scanId = 'scan id';


        it('should call api', async function() {
            await fetchScanReports({ tree, api }, scanId);
            api.scans.reports.should.have.been.calledWith({
                'scan-id': scanId
            });
        });

        it('should populate reports', async function() {
            await fetchScanReports({ tree, api }, scanId);
            tree.select('reports', reportId).get().should.be.eql(report);
        });


        it('should set scanReportsPage.scanId', async function() {
            api.scans.reports = spy();
            await fetchScanReports({ tree, api }, scanId);
            tree.get('scanReportsPage', 'scanId').should.be.eql(scanId);
        });
    });
});
