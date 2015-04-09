/*
 Auth actions
 */

'use strict';

import { dispatch } from '../lib/disp';
import C from '../constants';

export function lostAuth() {
    dispatch(C.USER_LOST_AUTH);
}
