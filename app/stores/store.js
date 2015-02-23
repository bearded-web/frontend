'use strict';

import Fluxxor from 'fluxxor';
import Immutable, { fromJS, Map } from 'immutable';
import consts from '../constants.js';
import { setCurrentProject as setCurrentAction } from '../actions/project.actions';
import { nextTick } from '../lib/helpers';
import localStorage from '../lib/local-storage';

let state = fromJS({
    currentProject: {
        targets: []
    },
    projects: {},

    modal: {}
});

let oldState = state;

function setCurrentProject(projectId) {
    let project = state.getIn(['projects', projectId]);

    state = state.set('currentProject', project || fromJS({
        id: projectId,
        targets: []
    }));   

    localStorage.setItem('currentProject', projectId);
}

export default Fluxxor.createStore({

    getState() {
        return state.toObject();
    },

    initialize() {

        this.bindActions(
            consts.PROJECTS_FETCH_SUCCESS, this._onProjectsFetch,
            consts.PROJECTS_SET_CURRENT, this._onSetCurrentProject,
            consts.TARGETS_FETCH_SUCCESS, this._onTargetsFetch,
            consts.ADD_TARGET_SUCCESS, this._onTargetAdd,
            consts.MODAL_OPEN, this._onOpenModal,
            consts.MODAL_CLOSE, this._onCloseModal,
            consts.TARGETS_SET_CURRENT, this._onTargetSetCurrent
        );
    },

    _onProjectsFetch(projects) {
        projects.forEach(function(project) {
            if (!project.members) project.members = [];
            if (!project.targets) project.targets = [];

            state = state.mergeIn(['projects', project.id], fromJS(project));
        });

        let $projects = state.get('projects');
        let currentId = state.get('currentProject').get('id');

        if (!currentId) {
            currentId = localStorage.getItem('currentProject');
            //TODO remove it (how?)
            nextTick(() => setCurrentAction(currentId))
        }

        let $current = state.getIn(['projects', currentId]);

        //TODO test
        state = state.set('currentProject', $current || $projects.first());

        this._emitChange();
    },

    _onSetCurrentProject(projectId) {
        setCurrentProject(projectId);

        this._emitChange();
    },

    _onTargetsFetch(targets) {
        if (!targets.length) return;

        //TODO check each target project
        let projectId = targets[0].project,
            project = state.getIn(['projects', projectId]);

        project = project.set('targets', fromJS(targets));

        state = state.setIn(['projects', projectId], project);
        let currentPId = state.getIn(['currentProject', 'id']);
        if (currentPId === projectId) {
            state = state.set('currentProject', project);
        }

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
        let currentPId = state.getIn(['currentProject', 'id']);
        if (currentPId === projectId) {
            state = state.set('currentProject', $project);
        }

        this._emitChange();
    },

    _onTargetSetCurrent(target) {
        setCurrentProject(target.project);

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

    _emitChange() {
        if (oldState !== state) {
            oldState = state;
            this.emit('change');
        }
    }
});


