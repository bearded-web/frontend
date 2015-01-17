var _ = require('lodash');
var constants = require('app/constants');

module.exports = {
    toggleLeftPanel: function() {
        this.dispatch(constants.APP_TOGGLE_LEFT_PANEL);
    }
};
