/**
 * newUserStore contain data for UserCreateStore, errors, loading, etc
 */

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';

function isEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

const initialState = fromJS({
    loading: false,
    disabled: true,
    error: '',
    user: {
        admin: false,
        email: ''
    }
});

const api = {};

const handlers = {
    [C.USER_NEW_CHANGE](state, { user }) {
        const disabled = !isEmail(user.get('email')) ||
            user.get('password').length < 8;

        return state
            .set('disabled', disabled)
            .mergeIn(['user'], user)
            .set('error', '');
    },
    [C.USER_CREATE_START](state) {
        return state.set('loading', true);
    },
    [C.USER_CREATE_SUCCESS]() {
        return initialState;
    },
    [C.USER_CREATE_FAIL](state, { error }) {
        return state.merge({
            loading: false,
            error: error.message || error.data && error.data.Message
        });
    }
};

export default createStore(api, handlers, initialState);

