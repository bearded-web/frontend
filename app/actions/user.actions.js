var _ = require('lodash'),
    constants = require('../constants'),
    api = require('../lib/api'),
    users = api('users'),
    router = require('../router'),
    auth = api('auth');


module.exports = {
    logIn: function(email, password) {
        var dispatch = this.dispatch.bind(this);

        dispatch(constants.USER_LOGIN_START);

        auth('login', { email: email, password: password })
            .then(() => api('me', 'info'))
            .then((data) => {
                dispatch(constants.USER_LOGIN_SUCCESS, data.user);
                router.get().transitionTo('/');
            })
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
            .then(() => api('me', 'info'))
            .then((data) => {
                dispatch(constants.USER_LOGIN_SUCCESS, data.user);
                router.get().transitionTo('/');
            })
            .catch((err) => dispatch(constants.USER_LOGIN_FAIL, iget('Wrong email or password')));
    }
};
