import { setCurrentProject } from './project.actions';
import _, { pluck, unique, find } from 'lodash';
import { users, targets, resultExtractor } from '../lib/api3';
import { dispatchBuilder, extractor } from '../lib/helpers';
import { dispatch as disp } from '../lib/disp';

var C = require('../constants'),
    router = require('../router');


module.exports = {
    fetchTargets: function(projectId) {
        let dispatch = this.dispatch.bind(this, C.TARGETS_FETCH_SUCCESS);

        return targets
            .list({ project: projectId })
            .then(data => {
                disp(C.TARGETS_FETCH_SUCCESS, data);
                return data;
            })
            .then((data) => data.results)
            .then(dispatch);
    },

    addTarget: function(type, domain, projectId) {
        this.dispatch(C.ADD_TARGET);
        disp(C.ADD_TARGET, {
            type,
            domain,
            project: projectId
        });

        if (!domain) {
            const message = iget('Target domain can\'t be empty');
            this.dispatch(C.ADD_TARGET_FAIL, message);
            disp(C.ADD_TARGET_FAIL, { message: message });
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
            .then(target => {
                router.get().transitionTo('target', { targetId: target.id });
                this.dispatch(C.ADD_TARGET_SUCCESS, target);
                disp(C.ADD_TARGET_SUCCESS, { target });
            })
            .catch((e) => {
                this.dispatch(C.ADD_TARGET_FAIL, e.data.Message);
                disp(C.ADD_TARGET_FAIL, { message: e.data.Message });
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
                //return setCurrentProject(target.project, true).then(() => {
                    this.dispatch(C.TARGETS_SET_CURRENT, target);
                //});
            });
    },

    unsetCurrentTarget: function() {
        this.dispatch(C.TARGETS_UNSET_CURRENT);
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
