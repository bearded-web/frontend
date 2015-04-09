'use strict';

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

    MODAL_OPEN: true,
    MODAL_CLOSE: true,

    PLAN_ADD: true,
    PLANS_FETCH_SUCCESS: true,
    PLANS_SET_SELECTED: true,
    PLANS_SELECT: true,
    PLAN_CHANGE: true,
    PLAN_REMOVE_SUCCESS: true,
    PLAN_SAVE_START: true,
    PLAN_SAVE_SUCCESS: true,
    PLAN_SAVE_ERROR: true,
    PLAN_WORKFLOW_CHANGE: true,
    PLAN_NEW_STEP: true,

    PLUGINS_FETCH_SUCCESS: true,

    REMOVE_TARGET_START: true,
    REMOVE_TARGET_SUCCESS: true,
    REMOVE_TARGET_FAIL: true,

    REPORTS_FETCH_SUCCESS: true,

    REPORTS_FETCH: true,
    REPORTS_SEVERITY_SELECT: true,

    SCANS_DETECT_CREATED: true,
    SCANS_FETCH_SUCCESS: true,
    SCANS_CREATION: true,

    TARGETS_FETCH_START: true,
    TARGETS_FETCH_SUCCESS: true,
    TARGETS_FETCH_FAIL: true,
    TARGETS_SET_CURRENT: true,
    TARGETS_UNSET_CURRENT: true,
    TARGETS_COMMENTS_FETCH_SUCCESS: true,

    TOAST_ADD: true,


    USER_LOGIN_START: true,
    USER_LOGIN_SUCCESS: true,
    USER_LOGIN_FAIL: true,

    USER_LOGOUT_START: true,
    USER_LOGOUT_SUCCESS: true,
    USER_LOGOUT_FAIL: true,
    USER_LOST_AUTH: true,

    USERS_FETCH_SUCCESS: true,


    PROJECT_ADD_MEMBER: true,
    PROJECT_REMOVE_MEMBER: true,
    PROJECT_FETCH_SUCCESS: true,
    PROJECT_MEMBERS_SUGGEST_FETCH_SUCCESS: true,

    PROJECTS_FETCH_SUCCESS: true,
    PROJECTS_SET_CURRENT: true,

    ________: false // dont want delete "," after duplicate line
};



var key = '_';
Object.keys(constants).forEach(function(c) {
    constants[c] = c + key;
});

module.exports = constants;
