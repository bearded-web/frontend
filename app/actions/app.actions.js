var _ = require('lodash');
var constants = require('../constants');

var api = require('../lib/api');
var router = require('../router');


module.exports = {
    toggleLeftPanel: function() {
        this.dispatch(constants.APP_TOGGLE_LEFT_PANEL);
    },

    /**
     * App lift action
     */
    initApp: function() {
        // try to fetch data
        api('me', 'info')
            .then(function(data) {
                this.dispatch(constants.USER_LOGIN_SUCCESS, data.user);
                this.dispatch(constants.APP_LIFT_SUCCESS);
                router.get().transitionTo('/');
            }.bind(this))
            .catch(function() {
                this.dispatch(constants.APP_LIFT_SUCCESS);
            }.bind(this));
    },

    showRegister: function() {
        router.get().transitionTo('signup');
    },

    showLogin: function() {
        router.get().transitionTo('login');
    }
};
