/**
 * Create store helper. Work with facebook dispatcher
 */

import { assign, forOwn, isFunction, without } from 'lodash';
import { register } from './disp';
import { is, Map } from 'immutable';
// throw new Error()
/**
 * Create new store, that work with dispatcher
 * @param {Object} api store api, must contain functions
 * @param {Object} handlers dispatch handlers, keys=consts, values=functions
 * @param {Map} initialState immutable map
 * @return {Object} store instance
 */
export default function createStore(api, handlers, initialState) {
    if (!Map.isMap(initialState)) {
        throw new Error('Initial state must be Map');
    }

    let state = initialState;
    let listeners = [];

    function Store() {}

    assign(Store.prototype, api, {
        getState() {
            return state.toObject();
        },

        getRawState() {
            return state;
        },

        onChange(func) {
            listeners.push(func);
        },

        offChange(func) {
            listeners = without(listeners, func);
        }
    });

    const store = new Store();

    register(function(data) {
        const { payload, actionType } = data;

        let handler = handlers[actionType];

        if (isFunction(handler)) {
            const newState = handler(state, payload);

            if (!Map.isMap(newState)) {
                console.warn(iget('Store handler should return Immutable.Map, return %s instead'), newState);
            }

            if (!is(state, newState)) {
                state = newState;

                // call all listeners
                listeners.forEach(func => func());
            }
        }
    });

    return store;
}
