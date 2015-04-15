/**
 * Actions for user settings page
 */

'use strict';

import { dispatch } from '../lib/disp';
import C from '../constants';
import { me } from '../lib/api3';
import settingsStore from '../stores/user-settings.store';


/**
 * Update passwords fields in form
 * @param {String} password
 * @param {String} oldPassword
 */
export function updateSettings({ password, oldPassword }) {
    dispatch(C.US_PASSWORD_FIELD_CHANGE, { password });
    dispatch(C.US_OLD_PASSWORD_FIELD_CHANGE, { oldPassword });
}

/**
 * Start password changing
 */
export function changePassword() {
    dispatch(C.US_PASSWORD_CHANGE_START);

    const { password, oldPassword } = settingsStore.getState();
    const dispatchSuccess = dispatch.bind(null, C.US_PASSWORD_CHANGE_SUCCESS);

    me.changePassword({ old: oldPassword, 'new': password })
        .then(dispatchSuccess)
        .catch(e => {
            dispatch(C.US_PASSWORD_CHANGE_FAIL, { message: e.data && e.data.Message });
        });
}
