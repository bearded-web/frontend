/**
 * Store handle data about issues comments
 */

import { fromJS, Map, List } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';

const initialState = fromJS({});
/*
state = {
    'issue 1 id': Map{
        comments: List[commentId1, commentId2]
    }
}
 */

const api = {
    /**
     * Return comments ids list for target or null if comments not loaded
     * @param {String} targetId target id
     * @return {List|null} list of ids
     */
    getComments(issueId) {
        return this.getRawState().getIn([issueId, 'comments']) || null;
    }
};

const handlers = {
    [C.ISSUE_COMMENTS_FETCH_SUCCESS](state, { issueId, commentsIds }) {
        let data = state.get(issueId);

        if (!data) {
            data = Map({ comments: [] });
        }

        data = data.set('comments', List(commentsIds));

        return state.set(issueId, data);
    }
};

export default createStore(api, handlers, initialState);
