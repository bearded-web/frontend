'use strict';

import { setCurrentProject } from './project.actions';
import { addComment } from './target.actions';
import { nextTick } from '../lib/helpers';
import { dispatch as nDispatch } from '../lib/disp';
import _, { isUndefined } from 'lodash';
import authStore from '../stores/auth.store';

var constants = require('../constants'),
    { extractor } = require('../lib/helpers'),
    { me, auth, users } = require('../lib/api3'),
    dispatch = require('../lib/dispatcher').dispatch,
    router = require('../router');


export function toggleLeftPanel() {
    dispatch(constants.APP_TOGGLE_LEFT_PANEL);
}

export function closeModal() {
    dispatch(constants.MODAL_CLOSE);
}

function handleMeData(data) {
    dispatch(constants.USER_LOGIN_SUCCESS, data.user);
    nDispatch(constants.USER_LOGIN_SUCCESS, data.user);

    if (data.projects.length) {
        dispatch(constants.PROJECTS_FETCH_SUCCESS, data.projects);
    }
}

function dispatchLoginState(state) {
    dispatch(constants.APP_LOGIN_PAGE_STATE, state);
}

