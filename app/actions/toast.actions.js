'use strict';

var C = require('../constants');

module.exports = {
    add: function() {

        this.dispatch(C.TOAST_ADD);
    }
};
