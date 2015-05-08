/**
 * Store handle data about targets comments
 */

import { fromJS, Map, List } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import mergeToState from '../lib/mergeToState';

const initialState = fromJS({});
/*
state = {
    'target 1 id': Map{
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
    getComments(targetId) {
        return this.getRawState().getIn([targetId, 'comments']) || null;
    }
};

const handlers = {
    [C.TARGET_COMMENTS_FETCH_SUCCESS](state, { targetId, commentsIds }) {
        let data = state.get(targetId);

        if (!data) {
            data = Map({ comments: [] });
        }

        data = data.set('comments', List(commentsIds));

        return state.set(targetId, data);
    }
};

export default createStore(api, handlers, initialState);
