var _ = require('lodash');
var constants = require('app/constants');
var router = require('../router');

module.exports = {
    addTarget: function(target) {
        this.dispatch(constants.ADD_TARGET, target);

        if (!target.domain) {
            this.dispatch(constants.ADD_TARGET_FAIL, __('Target domain can\'t be empty'));
            return;
        }
        setTimeout(function() {
            var newTaret = _.cloneDeep(target);
            newTaret.id = '123434' + Math.random();

            this.dispatch(constants.ADD_TARGET_SUCCESS, newTaret);
        }.bind(this), 1000);
    },

    removeTarget: function(targetId) {
        this.dispatch(constants.REMOVE_TARGET_START);

        setTimeout(() => {
            router.get().transitionTo('app');
            nextTick(() => {
                this.dispatch(constants.REMOVE_TARGET_SUCCESS, targetId);
            });
        }, 500);
    },

    openAddTargetModal: function() {
        this.dispatch(constants.SHOW_TARGET_MODAL);
    },

    hideModal: function() {
        this.dispatch(constants.HIDE_TARGET_MODAL);
    }
};
