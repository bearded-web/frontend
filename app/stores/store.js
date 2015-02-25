'use strict';

import Fluxxor from 'fluxxor';
import Immutable, { fromJS, Map } from 'immutable';
import consts from '../constants.js';
import { setCurrentProject as setCurrentAction, fetchProjectMembers } from '../actions/project.actions';
import { nextTick } from '../lib/helpers';
import localStorage from '../lib/local-storage';
import { find, isString, values } from 'lodash';

let state = fromJS({
    currentProjectId: localStorage.getItem('currentProjectId'),

    projects: {},

    modal: {},

    membersSuggest: []
});

let oldState = state;


export default Fluxxor.createStore({

    getState() {
        let currentId = state.get('currentProjectId'),
            currentProject = state.getIn(['projects', currentId]);

        return {
            projects: state.get('projects'),
            modal: state.get('modal'),
            currentProject,
            membersSuggest: state.get('membersSuggest')
        };
    },

    initialize() {

        this.bindActions(
            consts.PROJECTS_FETCH_SUCCESS, this._onProjectsFetch,
            consts.PROJECTS_SET_CURRENT, this._onSetCurrentProject,
            consts.TARGETS_FETCH_SUCCESS, this._onTargetsFetch,
            consts.ADD_TARGET_SUCCESS, this._onTargetAdd,
            consts.MODAL_OPEN, this._onOpenModal,
            consts.MODAL_CLOSE, this._onCloseModal,
            consts.TARGETS_SET_CURRENT, this._onTargetSetCurrent,
            consts.USERS_FETCH_SUCCESS, this._onUsersFetch,
            consts.PROJECT_ADD_MEMBER, this._onAddMember,
            consts.PROJECT_MEMBERS_SUGGEST_FETCH_SUCCESS, this._onMemberSuggest
        );
    },

    _onProjectsFetch(projects) {
        projects.forEach(function(project) {
            if (!project.members) project.members = [];
            if (!project.targets) project.targets = [];

            state = state.mergeDeepIn(['projects', project.id], fromJS(project));
        });

        let $projects = state.get('projects');
        let currentId = state.get('currentProjectId');

        if (!currentId) {
            currentId = $projects.first().get('id');
            state = state.set('currentProjectId', currentId);
        }

        this._emitChange();
    },

    _onSetCurrentProject(projectId) {
        state = state.set('currentProjectId', projectId);

        this._emitChange();
    },

    _onTargetsFetch(targets) {
        if (!targets.length) return;

        //TODO check each target project
        let projectId = targets[0].project,
            project = state.getIn(['projects', projectId]);

        project = project.set('targets', fromJS(targets));

        state = state.setIn(['projects', projectId], project);

        state = state.set('currentProjectId', projectId);

        this._emitChange();
    },

    _onTargetAdd(target) {
        let projectId = target.project,
            $project = state.getIn(['projects', projectId]);

        let $target = fromJS(target);
        let $targets = $project.get('targets');

        $targets = $targets.push($target);
        $project = $project.set('targets', $targets);

        state = state.setIn(['projects', projectId], $project);

        state = state.set('currentProjectId', projectId);

        this._emitChange();
    },

    _onTargetSetCurrent(target) {
        state = state.set('currentProjectId', target.project);

        this._emitChange();
    },

    _onOpenModal(modal) {
        state = state.set('modal', fromJS(modal));

        this._emitChange();
    },

    _onCloseModal() {
        state = state.set('modal', Map());

        this._emitChange();
    },

    _onUsersFetch(users) {
        users.forEach(function(user) {
            var projects = state.get('projects').toJS();

            values(projects).forEach(function(project) {
                project.members.map(function(member, i) {
                    if (member.user === user.id || member.user.id === user.id) {
                        state = state.setIn(['projects', project.id, 'members', i, 'user'], fromJS(user));
                    }
                })
            })
        });

        this._emitChange();
    },

    _onMemberSuggest(users) {
        state = state.set('membersSuggest', fromJS(users));

        this._emitChange();
    },

    _onAddMember(payload) {
        let { projectId, member } = payload;

        let $members = state.getIn(['projects', projectId, 'members']);

        $members = $members.push(fromJS(member));

        state = state.setIn(['projects', projectId, 'members'], $members);

        this._emitChange();
    },

    _emitChange() {
        if (oldState !== state) {
            localStorage.setItem('currentProjectId', state.get('currentProjectId'))

            oldState = state;
            this.emit('change');
        }
    }
});


