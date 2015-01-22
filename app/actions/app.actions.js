var _ = require('lodash');
var constants = require('../constants'),
    oldApi = require('../lib/api'),
    api = require('../lib/api2'),
    router = require('../router'),
    users = oldApi('users'),
    auth = oldApi('auth');


module.exports = {
    toggleLeftPanel: function() {
        this.dispatch(constants.APP_TOGGLE_LEFT_PANEL);
    },

    /**
     * App lift action
     */
    initApp: function() {
        // try to fetch data
        oldApi('me', 'info')
            .then(function(data) {
                this.dispatch(constants.APP_LIFT_SUCCESS);

                this.flux.actions.target.fetchTargets();

                handleMeData.call(this, data);
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
    },

    logIn: function(email, password) {
        var dispatch = this.dispatch.bind(this);

        dispatch(constants.USER_LOGIN_START);

        auth('login', { email: email, password: password })
            .then(() => oldApi('me', 'info'))
            .then(handleMeData.bind(this))
            .catch((err) => dispatch(constants.USER_LOGIN_FAIL, iget('Wrong email or password')));

    },

    logOut: function() {
        var dispatch = this.dispatch.bind(this);

        dispatch(constants.USER_LOGOUT_START);

        auth('logout')
            .then(() => window.location.reload());
    },

    signUp: function(email, password) {
        var dispatch = this.dispatch.bind(this);

        dispatch(constants.USER_LOGIN_START);
        users('create', { email: email })
            .then((user) => {
                return users('setPassword', { 'user-id': user.id }, { password: password });
            })
            .then(() => auth('login', { email: email, password: password }))
            .then(() => oldApi('me', 'info'))
            .then(handleMeData.bind(this))
            .catch((err) => dispatch(constants.USER_LOGIN_FAIL, iget('Wrong email or password')));
    }
};

function handleMeData(data) {
    this.dispatch(constants.USER_LOGIN_SUCCESS, data.user);

    if (data.projects.length)
        this.dispatch(constants.PROJECT_FETCH_SUCCESS, data.projects[0]);

    router.get().transitionTo('/');
}
