'use strict';

var _ = require('lodash'),
    constants = require('../constants'),
    { extractor } = require('../lib/helpers'),
    { me, auth, users } = require('../lib/api3'),
    dispatch = require('../lib/dispatcher').dispatch,
    targetActions = require('./target.actions'),
    router = require('../router');


module.exports = {
    toggleLeftPanel: function() {
        dispatch(constants.APP_TOGGLE_LEFT_PANEL);
    },

    /**
     * App lift action
     */
    initApp: function() {
        // try to fetch data
        me.info()
            .then((data) => {

                // for handle errors
                nextTick(() => {
                    dispatch(constants.APP_LIFT_SUCCESS);
                    handleMeData.call(this, data);

                    this.flux.actions.target.fetchTargets(data.projects[0].id);
                    this.flux.actions.plan.fetchPlans();
                });
            })
            .catch((e) => {
                dispatch(constants.APP_LIFT_SUCCESS);
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
        dispatch(constants.USER_LOGIN_START);

        auth.login({ body: { email: email, password: password } })
            .then(() => me.info())
            .then((data) => {
                targetActions.fetchTargets(data.projects[0].id);
                handleMeData.call(this, data);
            })
            .catch((err) => {
                dispatch(constants.USER_LOGIN_FAIL, iget('Wrong email or password'));
            });
    },

    logOut: function() {
        dispatch(constants.USER_LOGOUT_START);

        /* jshint -W093 */
        auth.logout().then(() =>  window.location = '/');
    },

    signUp: function(email, password) {
        dispatch(constants.USER_LOGIN_START);

        /* jshint -W093 */
        auth.register({ body: { email, password } })
            .then(() =>  window.location = '/')
            .catch((err) => {
                dispatch(constants.USER_LOGIN_FAIL, err.data.Message);
            });
    }
};

/* jshint -W040 */
function handleMeData(data) {
    dispatch(constants.USER_LOGIN_SUCCESS, data.user);

    if (data.projects.length)
        dispatch(constants.PROJECT_FETCH_SUCCESS, data.projects[0]);
}

function dispatchLoginState(state) {
    dispatch(constants.APP_LOGIN_PAGE_STATE, state);
}
