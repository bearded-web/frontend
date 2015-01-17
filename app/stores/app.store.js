var Fluxxor = require('fluxxor');
var _ = require('lodash');

var constants = require('app/constants');

module.exports = Fluxxor.createStore({
    leftPanelVisible: false,

    isLogedIn: true, //TODO change to false

    loginInProcess: false,
    loginError: '',
    user: {
        email: 'test@test',
        role: 'admin'
    },

    initialize: function() {
        this.bindActions(
            constants.USER_LOGIN_START, this.onUserLoginStart,
            constants.USER_LOGIN_SUCCESS, this.onUserLoginSuccess,
            constants.USER_LOGIN_FAIL, this.onUserLoginFail
        );

        useActions(this, constants, [
            'USER_LOGOUT_SUCCESS',
            'APP_TOGGLE_LEFT_PANEL'
        ])
    },



    onUserLoginStart: function() {
        this.loginInProcess = true;

        this.emit('change');
    },

    onUserLoginSuccess: function(user) {
        this.loginInProcess = false;
        this.isLogedIn = true;
        this.user = user;

        this.emit('change');
    },

    onUserLoginFail: function(reason) {
        this.loginInProcess = false;
        this.loginError = reason;

        this.emit('change');
    },

    _onUserLogoutSuccess: function() {
        this.user = {};
        this.isLogedIn = false;

        this._emitChange()
    },

    _onAppToggleLeftPanel: function() {
        this.leftPanelVisible = !this.leftPanelVisible;

        this._emitChange();
    },

    _emitChange: function() {
        this.emit('change');
    }
});

function useActions(store, constants, actions) {
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
        )
    });
}
