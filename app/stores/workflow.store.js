import { createStore } from 'fluxxor';
import { fromJS, is } from 'immutable';
import C from '../constants';

let $state = fromJS({
    $steps: []
});

let $oldState = $state;

export default createStore({

    getState() {
        return $state.toObject();
    },

    initialize() {
        this.bindActions(
            C.PLANS_SELECT, this._onPlanSelect
        );
    },

    _onPlanSelect($plan) {
        $state = $state.set('$steps', $plan.get('workflow'));

        this._emitChange();
    },

    _emitChange() {
        if (!is($oldState, $state)) {
            $oldState = $state;

            this.emit('change');
        }
    }
});
