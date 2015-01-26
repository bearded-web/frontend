var C = require('../constants'),
    router = require('../router'),
    api = require('../lib/api2');

module.exports = {
    fetchScans: function(scan) {
        var scanId = scan && scan.id || scan;

        if (scanId) {
            api.one('scans', scanId).then((scan) => {
                this.dispatch(C.SCANS_FETCH_SUCCESS, [scan]);
            });
        } else {
            api.all('scans').then((data) => {
                this.dispatch(C.SCANS_FETCH_SUCCESS, data.results);
            });
        }
    },

    /**
     * Create default detect scan for target
     * @param targetId
     * @param projectId
     * @param planId
     */
    createScan: function(targetId, projectId, planId) {
        return api
            .create('scans', {
                target: targetId,
                project: projectId,
                plan: planId
            })
            .then((scan) => {
                router.get().transitionTo('target', { targetId: targetId });
                this.dispatch(C.SCANS_DETECT_CREATED, scan);
            });
    },

    fetchReports: function(scanId) {
        api.all('scans/' + scanId + '/reports')
            .then((data) => {
                this.dispatch(C.REPORTS_FETCH_SUCCESS, data.results);
            });
    }
};
