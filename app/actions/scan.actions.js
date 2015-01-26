'use strict';

var C = require('../constants'),
    router = require('../router'),
    { dispatchBuilder } = require('../lib/helpers'),
    { scans, resultExtractor } = require('../lib/api3');

module.exports = {
    fetchScans: function(scan) {
        var scanId = scan && scan.id || scan,
            handler = scanId ? scans.get(scanId) : scans.list();

        return handler.then(resultExtractor(dispatchBuilder(C.SCANS_FETCH_SUCCESS, this)));
    },

    /**
     * Create default detect scan for target
     * @param targetId
     * @param projectId
     * @param planId
     */
    createScan: function(targetId, projectId, planId) {
        return scans
            .create({body:{
                target: targetId,
                project: projectId,
                plan: planId
            }})
            .then((scan) => {
                router.get().transitionTo('target', { targetId: targetId });
                this.dispatch(C.SCANS_DETECT_CREATED, scan);
            });
    },

    fetchReports: function(scanId) {
        scans.reports(scanId)
            .then((data) => {
                this.dispatch(C.REPORTS_FETCH_SUCCESS, data.results);
            });
    }
};
