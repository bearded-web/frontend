var _ = require('lodash');

var constants = require('app/constants'),
    router = require('../router'),
    targets = require('../lib/api')('targets'),
    api = require('../lib/api2');

module.exports = {
    fetchTargets: function() {
        api.targets.fetch()
            .then(this.dispatch.bind(this, constants.TARGETS_FETCH_SUCCESS))
    },

    addTarget: function(type, domain, project) {
        this.dispatch(constants.ADD_TARGET);

        if (!domain) {
            this.dispatch(constants.ADD_TARGET_FAIL, __('Target domain can\'t be empty'));
            return;
        }

        var target = {
            type: 'web',
            project: project.id,
            web: {
                domain: domain
            }
        };


        api.targets.create(target)
            .then((target) => this.dispatch(constants.ADD_TARGET_SUCCESS, target))
            .catch((e) => this.dispatch(constants.ADD_TARGET_FAIL, e));
    },

    removeTarget: function(target) {
        this.dispatch(constants.REMOVE_TARGET_START);

        api.targets.remove(target)
            .then(() => {
                router.get().transitionTo('/');
                nextTick(() => {
                    this.dispatch(constants.REMOVE_TARGET_SUCCESS, target.id);
                });
            });
    },

    openAddTargetModal: function() {
        this.dispatch(constants.SHOW_TARGET_MODAL);
    },

    hideModal: function() {
        this.dispatch(constants.HIDE_TARGET_MODAL);
    }
};
