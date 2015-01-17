var _ = require('lodash');


var constants = require('app/constants');

var api = require('../lib/api'),
    auth = api('auth');


module.exports = {
    logIn: function(email, password) {
        var dispatch = this.dispatch.bind(this);

        dispatch(constants.USER_LOGIN_START);

        auth('login', { email: email, password: password })

            .then(() => api('me', 'info'))

            .then((data) => dispatch(constants.USER_LOGIN_SUCCESS, data.user))

            .catch((err) => dispatch(constants.USER_LOGIN_FAIL, iget('Wrong email or password')))

    },

    logOut: function() {
        var dispatch = this.dispatch.bind(this);

        dispatch(constants.USER_LOGOUT_START);

        auth('logout').then(() => dispatch(constants.USER_LOGOUT_SUCCESS));

    }
};
