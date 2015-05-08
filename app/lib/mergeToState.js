'use strict';

import { fromJS } from 'immutable';
import { isArray } from 'lodash';

/**
 * Merge array of models into state Map.
 * Each model must contain id field
 * @param {Map} state immutable state
 * @param {Array} models models array
 * @returns {Map} changed state
 */
export default function mergeToState(state, models) {
    if (!isArray(models)) models = [models];

    const merge = (s, m) => s.mergeDeepIn([m.id], fromJS(m));

    return models
        .reduce(merge, state.asMutable())
        .asImmutable();
}
