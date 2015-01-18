var Fluxxor = require('fluxxor');
var _ = require('lodash');

var constants = require('app/constants');

module.exports = Fluxxor.createStore({
    targets: [
        {
            id: 'testtargetid',
            domain: 'test domain',
            type: 'web'
        }

    ],
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
        );
    },

    emitChange: function() {
        this.emit('change');
    },

    onTargetAddStart: function() {
        this.targetAddSuccess = false;
        this.targetAddInProcess = true;
        this.targetAddError = '';

        this.emitChange();
    },

    onTargetAdd: function(target) {
        this.targets.push(target);
        this.targetAddInProcess = false;
        this.targetAddSuccess = true;
        this.modalIsVisible = false;

        this.emitChange();
    },

    onTargetAddFail: function(errorText) {
        this.targetAddSuccess = false;
        this.targetAddError = errorText;
        this.targetAddInProcess = false;

        this.emitChange();
    },

    onShowTargetModal: function() {
        this.modalIsVisible = true;

        this.emitChange();
    },

    onHideTargetModal: function() {
        this.modalIsVisible = false;

        this.emit('change');
    },

    onRemoveTargetSuccess: function(targetId) {
        _.remove(this.targets, { id: targetId });

        this.emitChange();
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
