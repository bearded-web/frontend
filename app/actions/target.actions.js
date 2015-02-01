'use strict';

var _ = require('lodash'),
    C = require('../constants'),
    router = require('../router'),
    { dispatchBuilder } = require('../lib/helpers'),
    { targets, resultExtractor } = require('../lib/api3');


module.exports = {
    fetchTargets: function(projectId) {
        return targets.list({project: projectId}).then(resultExtractor(dispatchBuilder(C.TARGETS_FETCH_SUCCESS, this)));
    },

    addTarget: function(type, domain, project) {
        this.dispatch(C.ADD_TARGET);

        if (!domain) {
            this.dispatch(C.ADD_TARGET_FAIL, iget('Target domain can\'t be empty'));
            return;
        }

        var target = {
            type: 'web',
            project: project.id,
            web: {
                domain: domain
            }
        };


        targets.create(target)
            .then((target) => {
                router.get().transitionTo('target', { targetId: target.id });
                this.dispatch(C.ADD_TARGET_SUCCESS, target);
            })
            .catch((e) => this.dispatch(C.ADD_TARGET_FAIL, e.data.Message));
    },

    removeTarget: function(target) {
        this.dispatch(C.REMOVE_TARGET_START);

        targets.delete(target.id)
            .then(() => {
                router.get().transitionTo('/');
                nextTick(() => this.dispatch(C.REMOVE_TARGET_SUCCESS, target.id));
            });
    },

    openAddTargetModal: function() {
        this.dispatch(C.SHOW_TARGET_MODAL);
    },

    hideModal: function() {
        this.dispatch(C.HIDE_TARGET_MODAL);
    },

    setCurrentTarget: function(targetId) {
        targets.get(targetId)
            .then((target) => this.dispatch(C.TARGETS_SET_CURRENT, target));
    },

    unsetCurrentTarget: function() {
        this.dispatch(C.TARGETS_UNSET_CURRENT);
    }
};
