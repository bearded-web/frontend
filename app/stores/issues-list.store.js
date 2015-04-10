/**
 * Issues list store, store issues for issues list page.
 */

'use strict';

import { fromJS } from 'immutable';
import C from '../constants';
import createStore from '../lib/create-store';
import { pluck  } from 'lodash';


const initialState = fromJS({
    issues: [] // issues ids
});

const api = {};

const handlers = {
    [C.ISSUES_FETCH_SUCCESS](state, issues) {
        return state.set('issues', fromJS(pluck(issues, 'id')));
    }
};

export default createStore(api, handlers, initialState);
