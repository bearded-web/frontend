'use strict';

var _ = require('lodash'),
    constants = require('../constants'),
    { me, auth, users } = require('../lib/api3'),
    router = require('../router');


module.exports = {
    toggleLeftPanel: function() {
        this.dispatch(constants.APP_TOGGLE_LEFT_PANEL);
    },

    /**
     * App lift action
     */
    initApp: function() {
        // try to fetch data
        me.info()
            .then((data) => {
                this.dispatch(constants.APP_LIFT_SUCCESS);
                handleMeData.call(this, data);

                return Promise.all([
                    this.flux.actions.target.fetchTargets(data.projects[0].id),
                    this.flux.actions.plan.fetchPlans()
                ]);
            })
            .catch((e) => {
                console.log('cant init app', e.stack);
                this.dispatch(constants.APP_LIFT_SUCCESS);
                dispatchLoginState('login', this);
            });
    },

    showRegister: function() {
        dispatchLoginState('signup', this);
    },

    showLogin: function() {
        dispatchLoginState('login', this);
    },

    logIn: function(email, password) {
        var dispatch = this.dispatch.bind(this);

        dispatch(constants.USER_LOGIN_START);

        auth.login({ body: { email: email, password: password } })
            .then(() => me.info())
            .then((data) => {
                this.flux.actions.target.fetchTargets(data.projects[0].id);
                handleMeData.call(this, data);
            })
            .catch((err) => {
                dispatch(constants.USER_LOGIN_FAIL, iget('Wrong email or password'));
            });
    },

    logOut: function() {
        var dispatch = this.dispatch.bind(this);

        dispatch(constants.USER_LOGOUT_START);

        auth.logout().then(() =>  window.location = '/');
    },

    signUp: function(email, password) {
        var dispatch = this.dispatch.bind(this);

        dispatch(constants.USER_LOGIN_START);

        auth.register({ body: { email, password } })
            .then(() =>  window.location = '/')
            .catch((err) => {
                dispatch(constants.USER_LOGIN_FAIL, err.data.Message);
            });
    }
};

function handleMeData(data) {
    this.dispatch(constants.USER_LOGIN_SUCCESS, data.user);

    if (data.projects.length)
        this.dispatch(constants.PROJECT_FETCH_SUCCESS, data.projects[0]);
}

function dispatchLoginState(state, self) {
    self.dispatch(constants.APP_LOGIN_PAGE_STATE, state);
}
