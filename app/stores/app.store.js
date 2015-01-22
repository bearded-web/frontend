var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    constants = require('../constants'),
    useActions = require('../lib/use-actions');

module.exports = Fluxxor.createStore({
    inited: false,

    leftPanelVisible: false,

    isLogedIn: false,
    loginPageState: 'login',

    loginInProcess: false,
    loginError: '',
    user: {},

    initialize: function() {
        this.bindActions(
            constants.USER_LOGIN_START, this.onUserLoginStart,
            constants.USER_LOGIN_SUCCESS, this.onUserLoginSuccess,
            constants.USER_LOGIN_FAIL, this.onUserLoginFail,
            constants.APP_LOGIN_PAGE_STATE, this._onAppLoginPageState
        );

        useActions(this, constants, [
            'USER_LOGOUT_SUCCESS',
            'APP_TOGGLE_LEFT_PANEL',
            'APP_LIFT_SUCCESS'
        ]);
    },

    _onAppLoginPageState: function(state) {
        this.loginPageState = state;

        this._emitChange();
    },


    onUserLoginStart: function() {
        this.loginInProcess = true;

        this._emitChange();
    },

    onUserLoginSuccess: function(user) {
        this.loginInProcess = false;
        this.isLogedIn = true;
        this.user = user;

        this._emitChange();
    },

    onUserLoginFail: function(reason) {
        this.loginInProcess = false;
        this.loginError = reason;

        this._emitChange();
    },

    _onAppLiftSuccess: function() {
        this.inited = true;

        this._emitChange();
    },

    _onUserLogoutSuccess: function() {
        this.user = {};
        this.isLogedIn = false;

        this._emitChange();
    },

    _onAppToggleLeftPanel: function() {
        this.leftPanelVisible = !this.leftPanelVisible;

        this._emitChange();
    },

    _emitChange: function() {
        this.emit('change');
    }
});


