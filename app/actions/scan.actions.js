'use strict';

var C = require('../constants'),
    router = require('../router'),
    { dispatchBuilder } = require('../lib/helpers'),
    { scans, users, resultExtractor } = require('../lib/api3');

let wpScanId = '54d6153bc168ae101e000008',
    techId = '54c10f78c168ae62bb000001';

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
        var scan = {
            target: targetId,
            project: projectId,
            plan: planId
        };


        this.dispatch(C.SCANS_CREATION, {
            status: 'start',
            scan: scan
        });

        return scans
            .create({ body: scan })
            .then((scan) => Promise.all([scan, users.get(scan.owner)]))
            .then((result) => {
                var [scan, user] = result;

                scan.owner = user;

                router.get().transitionTo('target', { targetId: targetId });

                this.dispatch(C.SCANS_DETECT_CREATED, scan);
                this.dispatch(C.SCANS_CREATION, {
                    status: 'success',
                    scan: scan
                });
            })
            .catch((error) => {
                this.dispatch(C.SCANS_CREATION, {
                    status: 'error',
                    error
                });
            });
    },

    startFakeWp(t, p) {
        console.log('start fake wp');
        nextTick(() => this.flux.actions.scan.createScan(t, p, wpScanId));
    },

    startFakeTechs(t, p) {
        nextTick(() => this.flux.actions.scan.createScan(t, p, techId));
        
    },

    fetchReports: function(scanId) {
        scans.reports(scanId)
            .then((data) => {
                this.dispatch(C.REPORTS_FETCH_SUCCESS, data.results);
            });
    },

    setSelectedPlan: function(id) {
        this.dispatch(C.PLANS_SET_SELECTED, id);
    }
};
