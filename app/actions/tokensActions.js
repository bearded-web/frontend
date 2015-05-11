import { tokens } from '../lib/api3';
import { dispatch } from '../lib/disp';
import { pluck, uniq } from 'lodash';
import { captureException } from 'raven-js';
import C from '../constants';

/**
 * Create new token with name
 * @param {String} name
 */
export async function createToken(name) {
    dispatch(C.TOKEN_CREATE_START, { name });

    try {
        const token = await tokens.create({ body: { name } });

        dispatch(C.TOKEN_CREATE_SUCCESS, { token });
    }
    catch (e) {
        dispatch(C.TOKEN_CREATE_FAIL);
    }
}

export async function fetchTokens() {
    dispatch(C.TOKENS_FETCH_START);

    try {
        const tokensData = await tokens.list();

        dispatch(C.TOKENS_FETCH_SUCCESS, tokensData);
    }
    catch(e) {
        //TODO add error
        dispatch(C.TOKENS_FETCH_FAIL);

        captureException(e);
    }

}

export async function remove(tokenId) {
    try {
        await tokens.delete({ tokenId });

        dispatch(C.TOKEN_REMOVE_SUCCESS, { tokenId });
    }
    catch(e) {
        dispatch(C.TOKEN_REMOVE_FAIL);
    }
}
