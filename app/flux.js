import { captureException } from 'raven-js';

var actions = require('./actions'),
    stores = require('./stores'),
    Fluxxor = require('fluxxor');

const flux = new Fluxxor.Flux(stores, actions);

flux.on('dispatch', function(type, payload) {
    if (console && console.log) {
        console.log('[Dispatch]', type, payload);

        if (payload && payload.error) {
            captureException(payload.error);
            console.log('[Dispatch error]', payload.error.stack);
        }
    }
});

flux.createStoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = flux;
