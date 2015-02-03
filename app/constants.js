var constants = {
    AGENTS_FETCH_SUCCESS: true,

    APP_TOGGLE_LEFT_PANEL: true,
    APP_LIFT_SUCCESS: true,
    APP_LOGIN_PAGE_STATE: true,

    SHOW_TARGET_MODAL: true,
    HIDE_TARGET_MODAL: true,
    ADD_TARGET: 'ADD_TARGET',
    ADD_TARGET_SUCCESS: 'ADD_TARGET_SUCCESS',
    ADD_TARGET_FAIL: 'ADD_TARGET_FAIL',

    FEED_FETCH_SUCCESS: true,

    PLANS_FETCH_SUCCESS: true,

    REMOVE_TARGET_START: true,
    REMOVE_TARGET_SUCCESS: true,
    REMOVE_TARGET_FAIL: true,

    REPORTS_FETCH_SUCCESS: true,

    REPORTS_FETCH: true,

    SCANS_DETECT_CREATED: true,
    SCANS_FETCH_SUCCESS: true,
    SCANS_CREATION: true,

    TARGETS_FETCH_START: true,
    TARGETS_FETCH_SUCCESS: true,
    TARGETS_FETCH_FAIL: true,
    TARGETS_SET_CURRENT: true,
    TARGETS_UNSET_CURRENT: true,

    TOAST_ADD: true,


    USER_LOGIN_START: true,
    USER_LOGIN_SUCCESS: true,
    USER_LOGIN_FAIL: true,

    USER_LOGOUT_START: true,
    USER_LOGOUT_SUCCESS: true,
    USER_LOGOUT_FAIL: true,

    PROJECT_FETCH_SUCCESS: true,


    ________: false // dont want delete "," after duplicate line
};



var key = '_';
Object.keys(constants).forEach(function(c) {
    constants[c] = c + key;
});

module.exports = constants;
