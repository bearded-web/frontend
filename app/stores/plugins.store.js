import { createStore } from 'fluxxor';
import { fromJS, is } from 'immutable';
import C from '../constants';
import { zipModels } from '../lib/helpers';
import { pluck, zipObject } from 'lodash';

let $state = fromJS({
    $plugins: {}
});

let $oldState = $state;

export default createStore({
    getPlugins() {
        return $state.get('$plugins');
    },

    getState() {
        return $state.toObject();
    },

    initialize() {
        this.bindActions(
            C.PLUGINS_FETCH_SUCCESS, this._onPluginsFetchSuccess
        );
    },

    _onPluginsFetchSuccess(plugins) {
        $state = $state.set('$plugins', zipModels(plugins));

        this._emitChange();
    },

    _emitChange() {
        if (!is($oldState, $state)) {
            $oldState = $state;

            this.emit('change');
        }
    }
});
