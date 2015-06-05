/**
 * usersListStore contain users list for one page
 */

import { fromJS, List } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import { pluck } from 'lodash';

const initialState = fromJS({
    count: 0,
    pageSize: 15,
    users: [], // users ids
    loading: false
});

const api = {
    getIds() { return this.getRawState().get('users').toArray(); }
};

const handlers = {
    [C.USERS_PAGE_FETCH_START](state) {
        return state
            .set('loading', true);
    },
    [C.USERS_PAGE_FETCH_SUCCESS](state, { results, count }) {
        return state
            .set('count', count)
            .set('users', List(pluck(results, 'id')))
            .set('loading', true);
    }
};

export default createStore(api, handlers, initialState);

