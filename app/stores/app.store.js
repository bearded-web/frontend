'use strict';

var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    constants = require('../constants');

var project = null;

module.exports = Fluxxor.createStore({
    inited: false,

    leftPanelVisible: false,

    isLogedIn: false,
    loginPageState: 'login',

    loginInProcess: false,
    loginError: '',
    user: {},


    getState: function() {
        return _.pick(this, [
            'user',
            'inited',
            'leftPanelVisible',
            'isLogedIn',
            'loginPageState',
            'loginInProcess',
            'loginError'
        ]);
    },

    getProject: function() {
        return project;
    },


    initialize: function() {
        this.bindActions(
            constants.USER_LOGIN_START, this.onUserLoginStart,
            constants.USER_LOGIN_SUCCESS, this.onUserLoginSuccess,
            constants.USER_LOGIN_FAIL, this.onUserLoginFail,
            constants.APP_LOGIN_PAGE_STATE, this._onAppLoginPageState,
            constants.PROJECT_FETCH_SUCCESS, this._onProjectFetchSuccess,
            constants.APP_TOGGLE_LEFT_PANEL, this._onAppToggleLeftPanel,
            constants.APP_LIFT_SUCCESS, this._onAppLiftSuccess,
            constants.USER_LOGOUT_SUCCESS, this._onUserLogoutSuccess
        );
    },

    _onProjectFetchSuccess: function(p) {
        project = p;

        this._emitChange();
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


