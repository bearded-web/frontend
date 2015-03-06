var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    constants = require('../constants'),
    useActions = require('../lib/use-actions');

module.exports = Fluxxor.createStore({

    project: null,

    targets: [],

    targetAddInProcess: false,
    targetAddError: '',
    targetAddSuccess: false,
    modalIsVisible: false,

    initialize: function() {
        this.bindActions(
            constants.ADD_TARGET, this.onTargetAddStart,
            constants.ADD_TARGET_SUCCESS, this.onTargetAdd,
            constants.ADD_TARGET_FAIL, this.onTargetAddFail,
            constants.SHOW_TARGET_MODAL, this.onShowTargetModal,
            constants.HIDE_TARGET_MODAL, this.onHideTargetModal,
            constants.REMOVE_TARGET_SUCCESS, this.onRemoveTargetSuccess
            //constants.TARGETS_FETCH_SUCCESS, this._onTargetsFetch
        );

        useActions(this, constants, [
            'PROJECT_FETCH_SUCCESS'
        ]);

    },

    _emitChange: function() {
        this.emit('change');
    },

    _onProjectFetchSuccess: function(project) {
        this.project = project;

        this._emitChange();
    },

    _onTargetsFetch: function(targets) {
        this.targets = targets.reverse;

        this._emitChange();
    },


    onTargetAddStart: function() {
        this.targetAddSuccess = false;
        this.targetAddInProcess = true;
        this.targetAddError = '';

        this._emitChange();
    },

    onTargetAdd: function(target) {
        //this.targets.unshift(target);
        this.targetAddInProcess = false;
        this.targetAddSuccess = true;
        this.modalIsVisible = false;

        this._emitChange();
    },

    onTargetAddFail: function(errorText) {
        this.targetAddSuccess = false;
        this.targetAddError = errorText;
        this.targetAddInProcess = false;

        this._emitChange();
    },

    onShowTargetModal: function() {
        this.modalIsVisible = true;

        this._emitChange();
    },

    onHideTargetModal: function() {
        this.modalIsVisible = false;

        this._emitChange();
    },

    onRemoveTargetSuccess: function(targetId) {
        _.remove(this.targets, { id: targetId });

        this._emitChange();
    },


    getState: function() {
        return _.pick(this,
            'targets',
            'targetAddInProcess',
            'targetAddError'
        );
    },

    getTarget: function(id) {
        return _.find(this.targets, { id: id });
    }
});
