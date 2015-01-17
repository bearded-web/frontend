var constants = {
    APP_TOGGLE_LEFT_PANEL: true,
    APP_LIFT_SUCCESS: true,

    SHOW_TARGET_MODAL: true,
    HIDE_TARGET_MODAL: true,
    ADD_TARGET: 'ADD_TARGET',
    ADD_TARGET_SUCCESS: 'ADD_TARGET_SUCCESS',
    ADD_TARGET_FAIL: 'ADD_TARGET_FAIL',

    REMOVE_TARGET_START: true,
    REMOVE_TARGET_SUCCESS: true,
    REMOVE_TARGET_FAIL: true,


    USER_LOGIN_START: true,
    USER_LOGIN_SUCCESS: true,
    USER_LOGIN_FAIL: true,

    USER_LOGOUT_START: true,
    USER_LOGOUT_SUCCESS: true,
    USER_LOGOUT_FAIL: true,


    ________: false // dont want delete "," after duplicate line
};



var key = '_' || 'f^G&B#F@ffDEADCOW';
Object.keys(constants).forEach(function(c) {
    constants[c] = c + key;
});

module.exports = constants;
