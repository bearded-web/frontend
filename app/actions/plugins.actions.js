'use strict';

import { plugins } from '../lib/api3';
import { extractor } from '../lib/helpers';
import { dispatch } from '../lib/dispatcher';
import constants from '../constants';

export function fetch() {

    return plugins.list()
        .then(extractor)
        .then(dispatchPlugin);
}


function dispatchPlugin(plugins) {
    dispatch(constants.PLUGINS_FETCH_SUCCESS, plugins);
}


