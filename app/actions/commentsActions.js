import { targets, users, issues } from '../lib/api3';
import { dispatch } from '../lib/disp';
import { pluck, uniq } from 'lodash';
import C from '../constants';

export function fetchIssueComments(issueId) {
    issues.comments({ issueId })
        .then(data => {
            dispatch(C.COMMENTS_FETCH_SUCCESS, data.results);

            const commentsIds = pluck(data.results, 'id');

            dispatch(C.ISSUE_COMMENTS_FETCH_SUCCESS, { issueId, commentsIds });

            const usersId = uniq(pluck(data.results, 'owner'));

            return users.list({ 'id_in': usersId.join(',') });
        })
        .then(data => {
            dispatch(C.USERS_FETCH_SUCCESS, data.results);
        });
    //TODO catch
}

export function fetchTargetComments(targetId) {
    targets.comments({ 'target-id': targetId })
        .then(data => {
            dispatch(C.COMMENTS_FETCH_SUCCESS, data.results);

            const commentsIds = pluck(data.results, 'id');

            dispatch(C.TARGET_COMMENTS_FETCH_SUCCESS, { targetId, commentsIds });

            const usersId = uniq(pluck(data.results, 'owner'));

            return users.list({ 'id_in': usersId.join(',') });
        })
        .then(data => {
            dispatch(C.USERS_FETCH_SUCCESS, data.results);
        });
    //TODO catch
}


export function addTargetComment(targetId, text) {
    return targets
        .commentsAdd({
            'target-id': targetId,
            body: { text }
        })
        .then(() => {
            fetchTargetComments(targetId);
        });

    //TODO catch
}

export function addIssueComment(issueId, text) {
    return issues
        .commentsAdd({
            issueId,
            body: { text }
        })
        .then(() => {
            fetchIssueComments(issueId);
        });
    //TODO add catch
}
