var _ = require('lodash'),
    constants = require('app/constants'),
    router = require('../router'),
    targets = require('../lib/api')('targets'),
    api = require('../lib/api2');

module.exports = {
    fetchTargets: function() {
        return api
            .targets.fetch()
            .then(this.dispatch.bind(this, constants.TARGETS_FETCH_SUCCESS));
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
            .then((target) => {
                router.get().transitionTo('target', { targetId: target.id });
                this.dispatch(constants.ADD_TARGET_SUCCESS, target);
            })
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
    },

    setCurrentTarget: function(targetId) {
        api.targets.one(targetId)
            .then((target) => this.dispatch(constants.TARGETS_SET_CURRENT, target))
            .then(() => this.flux.actions.scan.fetchScans());
    },

    unsetCurrentTarget: function() {
        this.dispatch(constants.TARGETS_UNSET_CURRENT);
    }
};
