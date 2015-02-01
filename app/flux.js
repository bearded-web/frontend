var actions = require('./actions'),
    stores = require('./stores'),
    Fluxxor = require('fluxxor'),
    flux = new Fluxxor.Flux(stores, actions);

flux.on('dispatch', function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);

        payload && payload.error && console.log("[Dispatch error]", payload.error.stack); // jshint ignore:line
    }
});

flux.createStoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = flux;
