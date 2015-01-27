var Fluxxor = require('fluxxor'),
    constants = require('../constants');

module.exports = Fluxxor.createStore({
    initialize: function() {
        this.bindActions(
            constants.TOAST_ADD, this.onToastAdd
        );
    },

    onToastAdd: function() {
        this.emit('toast_add');
    }
});


