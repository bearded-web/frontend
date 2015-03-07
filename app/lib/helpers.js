'use strict';

import { pluck, zipObject } from 'lodash';
import { fromJS } from 'immutable';

export function dispatchBuilder(event, self) {
    return function(data) {
        self.dispatch(event, data);
    };
}

export function extractor(data) {
    return data.results ? data.results : [data];
}

export function nextTick(foo) {
    setTimeout(foo, 0);
}


/**
 * Convers server data array to Map with models id as keys
 * @param {Array} collection models collection
 * @return {Map}
 */
export function zipModels(collection) {
    return fromJS(zipObject(pluck(collection, 'id'), collection))
}

