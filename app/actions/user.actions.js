var _ = require('lodash');
var constants = require('app/constants');

module.exports = {
    logIn: function(email, password) {
        this.dispatch(constants.USER_LOGIN_START);

        //TODO запрос на логин юзера
        setTimeout(function() {
            this.dispatch(constants.USER_LOGIN_SUCCESS, {
                email: email,
                role: 'admin'
            });
        }.bind(this), 1000);
    },

    logOut: function() {
        this.dispatch(constants.USER_LOGOUT_START);

        //TODO ajax logout user
        setTimeout(function() {
            this.dispatch(constants.USER_LOGOUT_SUCCESS);
        }.bind(this), 300)
    }
};
