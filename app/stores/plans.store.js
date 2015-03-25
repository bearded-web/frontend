import { createStore } from 'fluxxor';
import { fromJS, is, Map, OrderedMap } from 'immutable';
import C from '../constants';
import { zipModels } from '../lib/helpers';
import { pluck, zipObject } from 'lodash';

let $state = Map({
    $edit: null,
    $plans: new OrderedMap()
});

let $oldState = $state;

export default createStore({
    getPlans() {
        return $state.get('$plans');
    },

    getState() {
        return $state.toObject();
    },

    initialize() {
        this.bindActions(
            C.PLANS_FETCH_SUCCESS, this._onPlansFetchSuccess,
            C.PLANS_SELECT, this._onPlanSelect,
            C.PLAN_SAVE_SUCCESS, this._onPlanSave,
            C.PLAN_CHANGE, this._onPlanChange,
            C.PLAN_WORKFLOW_CHANGE, this._onWorkflowChange,
            C.PLAN_NEW_STEP, this._onAddNewStep,
            C.PLAN_REMOVE_SUCCESS, this._onPlanRemove,
            C.PLAN_ADD, this._onAddPlan
        );
    },

    _onPlanSelect($plan) {
        $state = $state.set('$edit', $plan);

        this._emitChange();
    },

    _onPlansFetchSuccess(plans) {
        $state = $state.set('$plans',
            fromJS(zipObject(pluck(plans, 'id'), plans)).toOrderedMap());

        this._emitChange();
    },

    _onPlanSave(plan) {
        let $plan = fromJS(plan);

        if (plan.oldId) {
            $state = $state.removeIn(['$plans', plan.oldId]);
        }

        $state = $state.setIn(['$plans', plan.id], $plan).set('$edit', $plan);

        this._emitChange();
    },

    _onPlanChange(plan) {
        plan.dirty = true;

        $state = $state.mergeIn(['$edit'], plan);

        this._emitChange();
    },

    _onWorkflowChange($w) {
        $state = $state
            .setIn(['$edit', 'dirty'], true)
            .setIn(['$edit', 'workflow'], $w);

        this._emitChange();
    },

    _onAddNewStep(pluginId) {
        let path = ['$edit', 'workflow'],
            $wf = $state.getIn(path),
            $plugin = this.flux.store('PluginsStore').getPlugin(pluginId),
            { title, info } = $plugin.get('desc').toObject(),
            plugin = $plugin.get('name') + ':' + $plugin.get('version');

        $wf = $wf.push(Map({
            name: title,
            desc: info,
            plugin
        }));

        $state = $state.mergeIn(['$edit'], {
            dirty: true,
            workflow: $wf
        });

        this._emitChange();
    },

    _onPlanRemove(id) {
        $state = $state.deleteIn(['$plans', id]);

        this._emitChange();
    },

    _onAddPlan() {
        let id = Math.random() + '',
            $plan = fromJS({
                id,
                targetType: 'web',
                name: iget('New plan'),
                desc: '',
                isNew: true,
                workflow: []
            });

        $state = $state
            .setIn(['$plans', id], $plan)
            .set('$edit', $plan);

        this._emitChange();
    },

    _emitChange() {
        if (!is($oldState, $state)) {
            $oldState = $state;

            this.emit('change');
        }
    }
});
