/**
 * Facebook flux dispatcher instance
 */

'use strict';

import { Dispatcher } from 'flux';

const dispatcher = new Dispatcher();

/**
 * Register new callback on dispatcher
 */
export const register = dispatcher.register.bind(dispatcher);

/**
 * Dispatch action
 * @param {String} type action type (constant)
 * @param {*} [payload] data to dispatch
 */
export function dispatch(type, payload) {
    let cloned;

    if (payload) {
        cloned = {};
        Object.keys(payload).forEach(k => {
            const v = payload[k];
            if (v && v._root) {
                cloned[k] = v.toJS();
            }
            else {
                cloned[k] = v;
            }
        });
    }

    console.log('Dispatch ' + type, cloned);
    if (!type) {
        throw new Error(`Trying to dispatch undefined type (payload ${payload})`);
    }

    dispatcher.dispatch({
        actionType: type,
        payload: payload
    });
}
