/**
 * targetCreate
 */
import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import { WEB, ANDROID } from '../lib/target-types';

const initialState = fromJS({
    invalid: false,
    target: {
        type: WEB,
        web: {},
        android: {}
    },
    loading: false,
    error: ''
});

const api = {};

const handlers = {
    [C.ADD_TARGET](state) {
        return state.set('loading', true);
    },
    [C.ADD_TARGET_FAIL](state, { message }) {
        return state.merge({
            loading: false,
            error: message
        });
    },
    [C.ADD_TARGET_SUCCESS](state, { target }) {
        return initialState;
    },

    [C.TARGETS_CHANGE_EDITABLE](state, { target }) {
        state = state.mergeIn(['target'], target);

        state = state.set('invalid', validate(state.get('target')));


        return state;
    }
};

export default createStore(api, handlers, initialState);

/**
 * Check target validity
 * @param {Map} target target to validate
 * @return {String|null} validation error
 */
function validate(target) {
    const type = target.get('type');

    if (type === WEB) {
        const domain = target.getIn(['web', 'domain']) || '';

        if (!domain.length) {
            return iget('Target domain must be specified');
        }
        if (!domain.match(/^https?:\/\/.+/gi)) {
            return iget('Wrong domain format (try http://example.com)');
        }
    }
    if (type === ANDROID) {
        const name = target.getIn(['android', 'name']) || '';

        if (!name.length) {
            return iget('Target name must be specified');
        }

        const file = target.getIn(['android', 'file']);
        if (!file || !file.size) {
            return iget('Target file must be specified');
        }
    }

    return null;
}
