var dispatcher = require('../lib/dispatcher'),
    { scans } = require('../lib/api3'),
    { extractor } = require('../lib/helpers'),
    C = require('../constants');

module.exports = {

    /**
     * Fetch reports for scan, dispatch REPORTS_FETCH
     * @param {String} scan scan ID
     * @returns {Promise}
     */
    fetchScanReports: function(scan) {
         return scans.reports(scan)
             .then(extractor)
             .then(dispatchReports);
    },


    /**
     * Select severity level to show user
     * @param {String} severity
     */
    selectSeverity: function(severity) {
        dispatcher.dispatch(C.REPORTS_SEVERITY_SELECT, severity);
    }
};

function dispatchReports(reports) {
    dispatcher.dispatch(C.REPORTS_FETCH, {
        status: 'success',
        reports: reports
    });
}
