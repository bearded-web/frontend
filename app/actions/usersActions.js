import { users } from '../lib/api3';
import { dispatch } from '../lib/disp';
import C from '../constants';
import { captureException } from '../lib/raven';

/**
 * Load all users
 */
export async function fetchPage({ page = 1, pageSize = 20 } = {}) {
    dispatch(C.USERS_PAGE_FETCH_START, { page });

    const skip = (page - 1) * pageSize;
    const query = {
        skip,
        limit: pageSize,
        sort: '-created'
    };

    try {
        const result = await users.list(query);
        dispatch(C.USERS_PAGE_FETCH_SUCCESS, result);
    }
    catch (error) {
        captureException(error);
        dispatch(C.USERS_PAGE_FETCH_FAIL, { error });
    }
}

/**
 * Set new user password, used by admin
 * @param {String} userId user id
 * @param {String} password new password
 */
export async function setPassword(userId, password) {
    try {
        await users.setPassword({ 'user-id': userId, password });
        dispatch(C.USERS_SET_PASSWORD_SUCCESS);
    }
    catch (error) {
        dispatch(C.USERS_SET_PASSWORD_FAIL, { error });
    }
}

export function changeNewUser(user) {
    dispatch(C.USER_NEW_CHANGE, { user });
}

/**
 * Create new user
 * @param {Map} userp new user model
 */
export async function createUser(userp, router) {
    const user = userp.toJS();
    const randomId = 'new_user_' + Math.random();
    dispatch(C.USER_CREATE_START, { user, randomId });

    try {
        if (user.email) {
            const d = user.email.toString().indexOf('@');
            if (d > -1) {
                user.nickname = user.email.slice(0, d);
            }
        }
        const data = await users.create({ body: user });

        dispatch(C.USER_CREATE_SUCCESS, { user: data, randomId });

        router.transitionTo('user', { userId: data.id });
    }
    catch (error) {
        dispatch(C.USER_CREATE_FAIL, { error, user, randomId });
    }
}

export async function fetchUser({ id }) {
    try {
        const data = await users.list({ id });
        dispatch(C.USERS_FETCH_SUCCESS, data);
    }
    catch (error) {
        captureException(error);
    }
}
