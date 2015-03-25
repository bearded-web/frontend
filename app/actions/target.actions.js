'use strict';

import { setCurrentProject } from './project.actions';
import _, { pluck, unique, find } from 'lodash'
import { users, targets, resultExtractor } from '../lib/api3';
import { dispatchBuilder, extractor } from '../lib/helpers';

var C = require('../constants'),
    router = require('../router');


module.exports = {
    fetchTargets: function(projectId) {
        let dispatch = this.dispatch.bind(this, C.TARGETS_FETCH_SUCCESS);

        return targets
            .list({project: projectId})
            .then((data) => data.results)
            .then(dispatch);
    },

    addTarget: function(type, domain, projectId) {
        this.dispatch(C.ADD_TARGET);

        if (!domain) {
            this.dispatch(C.ADD_TARGET_FAIL, iget('Target domain can\'t be empty'));
            return;
        }

        var target = {
            type: 'web',
            project: projectId,
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
            .then((target) => {
                return setCurrentProject(target.project, true).then(() => {
                    this.dispatch(C.TARGETS_SET_CURRENT, target);
                });
            })
    },

    unsetCurrentTarget: function() {
        this.dispatch(C.TARGETS_UNSET_CURRENT);
    },

    fetchComments(target) {
        let comments = [],
            findUser = (users, comment) => find(users, { id: comment.owner }),
            assignUser = (comment, users) => comment.owner = findUser(users, comment),
            assignUsersToComments = (users) => {
                comments.forEach(c => assignUser(c, users))
            };

        return targets.comments(target.id)
            .then(extractor)
            .then(cs => comments = cs.reverse())
            .then(comments => pluck(comments, 'owner'))
            .then(unique)
            .then(userIds => users.list({ id_in: userIds.join(',') }))
            .then(extractor)
            .then(assignUsersToComments) // jshint ignore:line
            .then(() => this.dispatch(C.TARGETS_COMMENTS_FETCH_SUCCESS, comments));
    },

    addComment(target, text) {
        return targets
            .commentsAdd({
                'target-id': target.id,
                body: { text }
            })
            .then(() => {
                return this.flux.actions.target.fetchComments(target);
            });
    }
};
