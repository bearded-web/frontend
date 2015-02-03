var dispatcher = require('../lib/dispatcher'),
    { scans } = require('../lib/api3'),
    { extractor } = require('../lib/helpers'),
    C = require('../constants');

module.exports = {

    /**
     * Fetch reports for scan, dispatch REPORTS_FETCH
     * @param {String} scanId scan ID
     * @returns {Promise}
     */
    fetchScanReports: function(scanId) {
        dispatchReports([{
            "scan": scanId,
            "type": "multi",
            "multi": [
                {
                    "type": "issues",
                    "issues": [
                        {
                            "severity": "medium",
                            "summary": "Vulnerability in angularjs version 1.2.12",
                            "desc": "",
                            "urls": [{ "url": "http://example.com" }],
                            "extras": [
                                {
                                    "url": "https://github.com/angular/angular.js/blob/b3b5015cb7919708ce179dc3d6f0d7d7f43ef621/CHANGELOG.md",
                                    "title": ""
                                },
                                {
                                    "url": "http://avlidienbrunn.se/angular.txt",
                                    "title": ""
                                },
                                {
                                    "url": "https://github.com/angular/angular.js/commit/b39e1d47b9a1b39a9fe34c847a81f589fba522f8",
                                    "title": ""
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "techs",
                    "techs": [
                        {
                            "categories": [1],
                            "name": "angularjs",
                            "version": "1.2.12",
                            "confidence": 100
                        },
                        {
                            "categories": [1],
                            "name": "jquery",
                            "version": "1.11.1",
                            "confidence": 100
                        }
                    ]
                }
            ]
        }]);

        return scans.reports(scanId)
            .then(extractor)
            .then(dispatchReports);
    }
};

function dispatchReports(reports) {
    dispatcher.dispatch(C.REPORTS_FETCH, {
        status: 'success',
        reports: reports
    });
}
