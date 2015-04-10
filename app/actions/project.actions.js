import { dispatch } from '../lib/dispatcher';
import consts from '../constants';
import { projects, targets, users } from '../lib/api3';
import { nextTick } from '../lib/helpers';

/**
 * Create new project
 * @param  {String} name Project name
 * @return {Promise} promise with no data
 */
export function create(name) {
    return projects.create({ name }).then(function(project) {
        dispatch(consts.PROJECTS_FETCH_SUCCESS, [project]);   

        nextTick(() => setCurrentProject(project.id));
    });
}

/** * Set current project in dashboard
 * @param {String} projectId project id
 */
export function setCurrentProject(projectId, noTransition) {
    dispatch(consts.PROJECTS_SET_CURRENT, projectId);

    let pPromise = projects.get(projectId)
        .then(function (project) {
            let usersIds = project.members.map((member) => member.user);

            return users.list({ id_in: usersIds.join(',') });
        })
        .then(function(data) {
            dispatch(consts.USERS_FETCH_SUCCESS, data.results);
        });

    // call target actions
    let tPromise = targets.list({ project: projectId })
        .then(function(data) {
            dispatch(consts.TARGETS_FETCH_SUCCESS, data.results);

            if (!noTransition) {
                nextTick(() => {
                    let router = require('../router.js').get(); 
                    router.transitionTo('overview');
                });
            }

            return data.results;
        });

    return Promise.all([pPromise, tPromise]);
}

export function fetchProjectMembers(membersIds) {

    return users.list({ id_in: membersIds.join(',') })
        .then(function(data) {
            dispatch(consts.USERS_FETCH_SUCCESS, data.results);
        });
}


export function openCreateModal() {
    dispatch(consts.MODAL_OPEN, { name: 'project-create' });
}

export function openAddMemberModal(project) {
    dispatch(consts.MODAL_OPEN, { 
        name: 'project-add-member',  
        project
    });
}

export function addMember(projectId, $user) {
    return projects
        .membersCreate({
            'project-id': projectId,
            body: {
                user: $user.get('id')
            }
        })
        .then(function(member) {
            member.user = $user;
            dispatch(consts.PROJECT_ADD_MEMBER, {
                projectId,
                member
            });

            return member;
        });
}

export function removeMember(projectId, userId) {
    return projects.membersDelete({
        'project-id': projectId,
        'user-id': userId
    }).then(function() {
        dispatch(consts.PROJECT_REMOVE_MEMBER, { userId, projectId });
    });
}

export function fillMembersSuggest(email) {
    email = email.trim();

    if (!email) return dispatch(consts.PROJECT_MEMBERS_SUGGEST_FETCH_SUCCESS, []);

    users.list({ email: email })
        .then(function(data) {
            let users = data.results;

            dispatch(consts.PROJECT_MEMBERS_SUGGEST_FETCH_SUCCESS, users);
        });
}
