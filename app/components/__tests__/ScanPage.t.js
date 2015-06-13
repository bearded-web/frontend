import { spy } from 'sinon';
import testTree from 'react-test-tree';
import mockery from 'mockery';

describe('ScanPage', () => {
    const scanId = 'scan id';
    const plan = {
        id: 'plan id',
        desc: 'plan description'
    };
    const scan = {
        id: scanId,
        plan: plan.id,
        sessions: []
    };
    const scans = { [scan.id]: scan };
    const plans = { [plan.id]: plan };

    let instance = null;
    let Component = null;
    let tree = null;
    let params = null;
    let fetchScan = null;
    let fetchPlans = null;

    beforeEach(() => {
        params = { scanId };
        tree = createTree();
        mockery.registerMock('./target-scan', MockComponent);
        mockery.registerAllowable('../ScanPage');
        const ScanPage = require('../ScanPage');
        Component = stubContext(ScanPage, {
            tree,
            router: {
                makeHref: () => '',
                isActive: () => ''
            },
            api: {}
        });
        fetchScan = spy();
        fetchPlans = spy();
        instance = testTree(
            <Component
                plans={plans}
                scans={scans}
                params={params}
                fetchPlans={fetchPlans}
                fetchScan={fetchScan}/>,
            {
                stub: {
                    scan: <MockComponent/>
                }
            }
        );
    });

    it('should call fetchScan prop with params.scan', () => {
        fetchScan.should.have.been.calledWith(scanId);
    });

    it('should call fetchPlans prop', () => {
        fetchPlans.should.have.been.calledOnce;
    });

    it('should render scan title', () => {
        instance.cmp.cmp.title.innerText.should.be.eql(plan.desc);
    });

    it('should not render scan title if no plan', () => {
        instance = testTree(
            <Component
                plans={[]}
                scans={scans}
                params={params}
                fetchPlans={fetchPlans}
                fetchScan={fetchScan}/>
        );
        instance.cmp.cmp.title.innerText.should.be.empty;
    });

    it('should render target scan', () => {
        should.exist(instance.cmp.cmp.scan);
    });

    it('should not render TargetScan if scan no provided', () => {
        instance = testTree(
            <Component
                plans={plans}
                scans={[]}
                params={params}
                fetchPlans={fetchPlans}
                fetchScan={fetchScan}/>
        );
        should.not.exist(instance.cmp.cmp.scan);
    });

    //it('should pass reports prop to ReportIssues', () => {
    //    instance.cmp.cmp.issues.getProp('reports').should.be.eql(reports);
    //});
    //
    //it('should pass severity prop to ReportIssues', () => {
    //    instance.cmp.cmp.issues.getProp('severity').should.be.eql(MEDIUM);
    //});
    //
    //it('should pass reports prop to ReportTechs', () => {
    //    instance.cmp.cmp.techs.getProp('reports').should.be.eql(reports);
    //});
    //
    //it('should pass reports prop to RawReports', () => {
    //    instance.cmp.cmp.rawReports.getProp('reports').should.be.eql(reports);
    //});
    //
    //it('should call router.transitionTo if Issues call onSeveritySelect prop', () => {
    //    instance.cmp.cmp.issues.getProp('onSeveritySelect')(MEDIUM);
    //    router.transitionTo.should.have.been.calledWith(path, {}, {
    //        scan: scanId,
    //        severity: MEDIUM
    //    });
    //});
});
