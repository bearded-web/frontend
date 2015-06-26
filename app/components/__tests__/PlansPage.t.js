import { spy } from 'sinon';
import testTree from 'react-test-tree';
import Baobab from 'baobab';
import dataTree, { facets } from '../../lib/dataTree';
import mockery from 'mockery';

describe('PlansPage', () => {
    const plan = {
        id: 'plan id',
        name: 'cool plan'
    };
    const plans = {
        [plan.id]: plan
    };
    const currentUser = { admin: true };
    let instance = null;
    let Component = null;
    let router = null;
    let fetchPlans = null;

    beforeEach(() => {
        router = () => ({});
        router.transitionTo = spy();
        fetchPlans = spy();
        mockery.registerMock('./plans', MockComponent);
        mockery.registerAllowable('../PlansPage');
        Component = stubContext(require('../PlansPage'), {
            tree: new Baobab(dataTree, { facets }),
            api: {},
            router
        });
        instance = testTree(<Component
            currentUser={currentUser}
            fetchPlans={fetchPlans}
            plans={plans}/>);
        instance = instance.cmp.cmp;
    });

    it('should render plans', () => {
       instance.plans.getProp('plans').toJS().should.be.eql({
           [plan.id]: plan
       });
    });
    it('should render search', () => {
        should.exist(instance.search);
    });
    it('should pass search to plans', () => {
        const searchText = ' search text ';
        instance.search.element.value = searchText;
        instance.search.simulate.change({ target: instance.search.element });
        instance.plans.getProp('search').should.be.eql(searchText);
    });
    it('should fetch plans on mount', () => {
        fetchPlans.should.have.been.calledOnce;
    });
    it('should move user to plan create page when create btn clicked', () => {
        instance.create.click();
        router.transitionTo.should.have.been.calledWith('plan', {
            planId: 'new'
        });
    });

    it('should not render create btn if not admin', () => {
        instance = testTree(<Component
            currentUser={{admin: false}}
            fetchPlans={fetchPlans}
            plans={plans}/>);
        instance = instance.cmp.cmp;
        should.not.exist(instance.create);
    });
});
