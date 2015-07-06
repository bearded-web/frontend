import { dispatch } from '../lib/dispatcher';
import consts from '../constants';
import { projects, targets, users } from '../lib/api3';
import { nextTick } from '../lib/helpers';
import { dispatch as disp } from '../lib/disp';


export function fetchProjectMembers(membersIds) {

    return users.list({ id_in: membersIds.join(',') })
        .then(function(data) {
            dispatch(consts.USERS_FETCH_SUCCESS, data);
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

export function fillMembersSuggest(email) {
    email = email.trim();

    if (!email) return dispatch(consts.PROJECT_MEMBERS_SUGGEST_FETCH_SUCCESS, []);

    users.list({ email: email })
        .then(function(data) {
            let users = data.results;

            dispatch(consts.PROJECT_MEMBERS_SUGGEST_FETCH_SUCCESS, users);
        });
}
