'use strict';

import { plans } from '../lib/api3';
import { extractor } from '../lib/helpers';
import { dispatch } from '../lib/dispatcher';
import C from '../constants';


function dispatchPlans(plans) {
    dispatch(C.PLANS_FETCH_SUCCESS, plans);
}

export function fetchPlans(planId) {
    var request = planId ? plans.get(planId) : plans.list();

    return request
        .then((data) =>  data.results ? data.results : [data])
        .then(dispatchPlans.bind(this));
}

export function selectPlans($plan) {
    dispatch(C.PLANS_SELECT, $plan);
}


/**
 * Save current editing plan
 */
export function saveEdit() {
    let flux = require('../flux'),
        $plan = flux.store('PlansStore').getState().$edit,
        plan = $plan.toJS();


    dispatch(C.PLAN_SAVE_START, $plan);

    if (plan.isNew) {
        let oldId = plan.id;
        delete plan.id;

        plans.create({ body: plan }).then(plan => {
            plan.oldId = oldId;
            dispatch(C.PLAN_SAVE_SUCCESS, plan);
        });
    }
    else {
        plans.update({ 'plan-id': plan.id, body: plan })
            .then(plan => dispatch(C.PLAN_SAVE_SUCCESS, plan));
    }
}

export function change(data) {
    dispatch(C.PLAN_CHANGE, data);
}


export function changeWorkflow($workflow) {
    dispatch(C.PLAN_WORKFLOW_CHANGE, $workflow);
}

/**
 * Add new step to current editing plan
 * @param {String} pluginId plugin to use
 */
export function addStep(pluginId) {
    dispatch(C.PLAN_NEW_STEP, pluginId);
}

/**
 * Remove plan
 * @param {Map} $plan
 */
export function remove($plan) {
    let id = $plan.get('id');

    if ($plan.get('isNew')) {
        dispatch(C.PLAN_REMOVE_SUCCESS, id);

        return;
    }

    plans.delete(id)
        .then(function() {
            dispatch(C.PLAN_REMOVE_SUCCESS, id);
        });
}

/**
 * Add new plan to store (but not to server)
 */
export function addNew() {
    dispatch(C.PLAN_ADD);
}

/**
 * Start plan editing
 * @param {String} planId plan id
 */
export function startPlanEdit(planId) {
    let flux = require('../flux'),
        plansStore = flux.store('PlansStore'),
        plan = plansStore.getPlan(planId);

    if (plan) {
        return dispatch(C.PLANS_SELECT, plan);
    }

    fetchPlans(planId).then(function() {
        dispatch(C.PLANS_SELECT, plansStore.getPlan(planId));
    });
}
