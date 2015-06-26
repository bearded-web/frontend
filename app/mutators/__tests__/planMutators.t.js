import { spy } from 'sinon';
import { fetchPlans, deletePlan } from '../planMutators';

describe('planMutators', () => {
    let tree = null;
    let api = null;
    let plan = null;

    beforeEach(() => {
        plan = { id: 'plan id', name: 'plan name' };
        tree = createTree();
        api = {
            plans: {}
        };
        api.plans.list = spy(() => Promise.resolve({ results: [plan] }));
    });

    describe('fetchPlans', () => {
        it('should call api', async function() {
            await fetchPlans({ tree, api });
            api.plans.list.should.have.been.calledOnce;
        });

        it('should populate agents', async function() {
            await fetchPlans({ tree, api });
            tree.select('plans', plan.id).get().should.be.eql(plan);
        });
    });

    describe('deletePlan', () => {
        beforeEach(() => {
            tree.select('plans').set(plan.id, plan);
            tree.commit();
            api.plans.delete = spy(() => Promise.resolve());
        });
        it('should call api', async function() {
            await deletePlan({ tree, api }, plan.id);
            api.plans.delete.should.have.been.calledWith(plan.id);
        });
        it('should remove plan from tree', async function() {
            await deletePlan({ tree, api }, plan.id);
            tree.select('plans').get().should.be.eql({});
        });
        it('should put plan back if request fail', async function() {
            api.plans.delete = spy(() => Promise.reject());
            await deletePlan({ tree, api }, plan.id);
            tree.select('plans', plan.id).get().should.be.eql(plan);
        });
    });
});
