/*
 Auth actions
 */

'use strict';

import { dispatch } from '../lib/disp';
import C from '../constants';
//import { auth } from '../lib/api3';

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
