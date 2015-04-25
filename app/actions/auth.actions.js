/*
 Auth actions
 */

'use strict';

import { dispatch } from '../lib/disp';
import C from '../constants';
import { auth, me } from '../lib/api3';

export function login(email, password) {
    dispatch(C.USER_LOGIN_START);

    auth
        .login({ body: { email: email, password: password } })
        .then(() => window.location = '/')
        .catch(() => {
            dispatch(C.USER_LOGIN_FAIL, iget('Wrong email or password'));
        });
}

/**
 * Relogin user when he lost auth
 * @param {String} email user emails
 * @param {String} password user password
 */
export function unlock(email, password) {
    dispatch(C.AUTH_UNLOCK_START);

    auth
        .login({ body: { email: email, password: password } })
        .then(() => {
            dispatch(C.AUTH_UNLOCK_SUCCESS);
        })
        .catch(() => {
            dispatch(C.AUTH_UNLOCK_FAIL, iget('Wrong password'));
        });
}

/**
 * Create new user
 * @param {String} email user emails
 * @param {String} password user password
 */
export function signUp(email, password) {
    dispatch(C.USER_LOGIN_START);

    auth.register({ body: { email, password } })
        .then(() =>  window.location = '/')
        .catch(err => {
            dispatch(C.USER_LOGIN_FAIL, err.data.Message);
        });
}

/**
 * User lost his auth (401 code in api)
 */
export function lostAuth() {
    dispatch(C.USER_LOST_AUTH);
}

/**
 * Start logout and remove user
 */
export function logOut() {
    dispatch(C.USER_LOGOUT_START);

    const reloadPage = () =>  window.location = '/';

    //TODO find circular deps
    require('../lib/api3').auth.logout()
        .then(reloadPage)
        .catch(reloadPage);
}

/**
 * Start reset password process
 * @param {String} email user email
 */
export function resetPassword({ email }) {
    dispatch(C.AUTH_RESET_PASSWORD_START);

    const goToOkPage = () => require('../router').get().transitionTo('password-reset-ok');

    auth.resetPassword({ email })
        .then(() => dispatch(C.AUTH_RESET_PASSWORD_SUCCESS))
        .then(goToOkPage)
        .catch(e => dispatch(C.AUTH_RESET_PASSWORD_FAIL, buildError(e)));
}

/**
 * Set new password
 * @param {String} token server token
 * @param {String} password new password
 */
export function setNewPassword(token, password) {
    dispatch(C.AUTH_NEW_PASSWORD_START);

    const goToLoginPage = () => require('../router').get().transitionTo('login');

    me.changePassword({ token: token, new: password })
        .then(() => dispatch(C.AUTH_NEW_PASSWORD_SUCCESS))
        .then(goToLoginPage)
        .catch(e => dispatch(C.AUTH_NEW_PASSWORD_FAIL, buildError(e)));
}

function buildError({ data, message }) {
    data = data || {};

    return { message: data.Message || message || iget('Server error') };
}
