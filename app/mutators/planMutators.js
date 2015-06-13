import { captureException } from '../lib/raven';
import { isString } from 'lodash';

export async function fetchPlans({ tree, api }) {
    const plansCursor = tree.select('plans');
    try {
        const { results } = await api.plans.list();
        results.forEach(t => plansCursor .update({ [t.id]: { $set: t } }));
        tree.commit();
    }
    catch(e) {
        captureException(e);
    }
}

export async function deletePlan({ tree, api }, id) {
    assert(isString(id), id, 'Should be string');

    const plan = tree.select('plans', id).get();

    if (!plan) return;

    tree.select('plans').unset(id);
    tree.commit();
    try {
        await api.plans.delete(id);
    } catch (e) {
        captureException(e);
        tree.select('plans').set(plan.id, plan);
        tree.commit();
    }
}
