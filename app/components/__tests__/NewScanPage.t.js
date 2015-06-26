import { spy } from 'sinon';
import testTree from 'react-test-tree';
import mockery from 'mockery';
import Immutable from 'immutable';

describe('NewScanPage', () => {
    const target = 'target id';
    const project = 'project id';
    const plan = {
        id: 'plan id',
        name: 'plan name'
    };

    let instance = null;
    let Component = null;
    let tree = null;
    let fetchPlans = null;
    let createScan = null;

    beforeEach(() => {
        const plans = { [plan.id]: plan };
        fetchPlans = spy();
        createScan = spy();
        tree = createTree();
        mockery.registerMock('./plans', MockComponent);
        mockery.registerAllowable('../NewScanPage');
        const NewScanPage = require('../NewScanPage');
        Component = stubContext(NewScanPage, {
            router: () => ({}),
            tree,
            api: {}
        });
        instance = testTree(
            <Component
                params={{ targetId: target }}
                query={{ project }}
                fetchPlans={fetchPlans}
                createScan={createScan}
                plans={plans}/>
        );
    });

    it('should call fetchPlans prop on mount', () => {
        fetchPlans.should.have.been.calledOnce;
    });

    it('should change title', () => {
        global.document.title.should.contain(iget('New scan'));
    });

    it('should render plans', () => {
        const plansProp = instance.cmp.cmp.plans.getProp('plans');
        Immutable.Map.isMap(plansProp).should.be.true;
    });

    it('should call createScan', () => {
        const imPlan = Immutable.fromJS(plan);
        instance.cmp.cmp.plans.getProp('onStartScan')(imPlan);
        createScan.should.have.been.calledWith(target, project, plan.id);
    });
});
