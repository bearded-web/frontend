'use strict';
/**
 * Dispatch event to stores
 * @param {String} type event type
 * @param {*} payload payload data
 */
function dispatch(type, payload) {
    var flux = require('../flux');

    flux.dispatchBinder.dispatch(type, payload);
}

module.exports = { dispatch };
