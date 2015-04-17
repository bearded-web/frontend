'use strict';
module.exports = function useActions(store, constants, actions) {
    actions.forEach(function(action) {
        var methodName = '_on';

        methodName += action
            .toLowerCase()
            .replace(/(?:^|_)\w/g, function(match) {
                return match.toUpperCase();
            })
            .replace(/_/g, '');

        if (typeof store[methodName] !== 'function') {
            console.warn('Try to bind non function (%s = %s) to store', methodName, store[methodName]);
        }

        store.bindActions(
            constants[action],
            store[methodName]
        );
    });
};
