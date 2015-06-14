/**
 * Actions for user settings page
 */

'use strict';

import { dispatch } from '../lib/disp';
import C from '../constants';
import { me } from '../lib/api3';
import settingsStore from '../stores/user-settings.store';
import { captureException } from '../lib/raven';


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
export async function changePassword() {
    dispatch(C.US_PASSWORD_CHANGE_START);

    const { password, oldPassword } = settingsStore.getState();

    try {
        await me.changePassword({ old: oldPassword, 'new': password });
        dispatch(C.US_PASSWORD_CHANGE_SUCCESS);
    }
    catch(e) {
        dispatch(C.US_PASSWORD_CHANGE_FAIL, { message: e.data && e.data.Message });

        captureException(e);
    }
}
