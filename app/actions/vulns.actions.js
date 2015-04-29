/**
 * Actions for work with vulndb
 */

'use strict';

import { vulndb } from '../lib/api3';
import { extractor } from '../lib/helpers';
import { dispatch } from '../lib/disp';
import C from '../constants';

/**
 * Fetch compact list with vulndb data
 * Each result contain id and title
 */
export function fetchVulnsCompact() {
    dispatch(C.VULNS_FETCH_START);

    vulndb
        .compact()
        .then(extractor)
        .then(vulns => dispatch(C.VULNS_FETCH_SUCCESS, { vulns }));
}
