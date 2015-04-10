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

/**
 * App lift action
 */
export function initApp() {
    // try to fetch data
    me.info()
        .then((data) => {

            // for handle errors
            nextTick(() => {
                dispatch(constants.APP_LIFT_SUCCESS);
                handleMeData.call(this, data);

                nextTick(() => {

                    let $project = this.flux.store('Store').getState().currentProject;
                    this.flux.actions.target.fetchTargets($project.get('id'));
                    this.flux.actions.plan.fetchPlans();
                });
            });
        })
        .catch((e) => {
            dispatch(constants.APP_LIFT_SUCCESS);
            dispatchLoginState('login', this);
        });
}

export function showRegister() {
    dispatchLoginState('signup', this);
}

export function showLogin() {
    dispatchLoginState('login', this);
}

/**
 * Login user by email and password
 * @param {String} email user email
 * @param {String} password user password
 */
export function logIn(email, password) {

    dispatch(constants.USER_LOGIN_START);

    auth.login({ body: { email: email, password: password } })
        .then(() => me.info())
        .then((data) => {
            handleMeData.call(this, data);

            nextTick(() => {

                let $project = this.flux.store('Store').getState().currentProject;
                this.flux.actions.target.fetchTargets($project.get('id'));
                setCurrentProject($project.get('id'), true);
                this.flux.actions.plan.fetchPlans();
            });
        })
        .catch(() => {
            nDispatch(constants.USER_LOGIN_FAIL, iget('Wrong email or password'));
            dispatch(constants.USER_LOGIN_FAIL, iget('Wrong email or password'));
        });
}

export function logOut() {
    dispatch(constants.USER_LOGOUT_START);

    const reloadPage = () =>  window.location = '/';

    auth.logout()
        .then(reloadPage)
        .catch(reloadPage);
}

export function signUp(email, password) {
    dispatch(constants.USER_LOGIN_START);

    /* jshint -W093 */
    auth.register({ body: { email, password } })
        .then(() =>  window.location = '/')
        .catch((err) => {
            dispatch(constants.USER_LOGIN_FAIL, err.data.Message);
        });
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

