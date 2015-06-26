import { spy } from 'sinon';
import testTree from 'react-test-tree';
import Baobab from 'baobab';
import mockery from 'mockery';
import dataTree, { facets } from '../../lib/dataTree';
import ReportPage from '../ReportPage';
import { MEDIUM } from '../../lib/severities';

describe('ReportPage', () => {
    const scanId = 'scan id';
    const reports = [];
    const path = 'report';

    let instance = null;
    let Component = null;
    let tree = null;
    let query = null;
    let fetchScanReports = null;
    let router = null;

    beforeEach(() => {
        query = { scan: scanId, severity: MEDIUM };
        router = {
            getCurrentPath: () => path,
            getCurrentParams: () => ({}),
            getCurrentQuery: () => query,
            transitionTo: spy()
        };
        tree = createTree();
        Component = stubContext(ReportPage, {
            tree,
            router,
            api: {}
        });
        fetchScanReports = spy();
        instance = testTree(
            <Component
                reports={reports}
                query={query}
                fetchScanReports={fetchScanReports}/>
        );
    });

    it('should call fetchScanReport prop with query.scan', () => {
        fetchScanReports.should.have.been.calledWith(scanId);
    });

    it('should pass reports prop to ReportIssues', () => {
        instance.cmp.cmp.issues.getProp('reports').should.be.eql(reports);
    });

    it('should pass severity prop to ReportIssues', () => {
        instance.cmp.cmp.issues.getProp('severity').should.be.eql(MEDIUM);
    });

    it('should pass reports prop to ReportTechs', () => {
        instance.cmp.cmp.techs.getProp('reports').should.be.eql(reports);
    });

    it('should pass reports prop to RawReports', () => {
        instance.cmp.cmp.rawReports.getProp('reports').should.be.eql(reports);
    });

    it('should call router.transitionTo if Issues call onSeveritySelect prop', () => {
        instance.cmp.cmp.issues.getProp('onSeveritySelect')(MEDIUM);
        router.transitionTo.should.have.been.calledWith(path, {}, {
            scan: scanId,
            severity: MEDIUM
        });
    });
});
