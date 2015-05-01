/*
 Targets actions
 */

'use strict';

import { dispatch } from '../lib/disp';
import C from '../constants';
import targetCreateStore from '../stores/target-create.store';
import { targets } from '../lib/api3';
import { get as rGet } from '../router';
import { WEB, ANDROID } from '../lib/target-types';

export function changeEditable(target) {
    dispatch(C.TARGETS_CHANGE_EDITABLE, { target });
}

export function saveEditable() {
    const target = targetCreateStore.getState().target.toJS();

    if (target.type !== WEB) {
        delete target.web;
    }
    if (target.type !== ANDROID) {
        delete target.android;
    }


    dispatch(C.ADD_TARGET);

    targets.create({ body: target })
        .then(target => {
            rGet().transitionTo('target', { targetId: target.id });
            dispatch(C.ADD_TARGET_SUCCESS, { target });
        })
        .catch(e => {
            dispatch(C.ADD_TARGET_FAIL, { message: e.data.Message });
        });
}
