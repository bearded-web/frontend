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

        //return new Promise(function(resolve) {
        //
        //    dispatchReports([{
        //        scan,
        //        id: '1',
        //        "type": "multi",
        //        "multi": [
        //            {
        //                scan,
        //                id: '2',
        //                "type": "issues",
        //                "issues": [
        //                    {
        //                        "severity": "medium",
        //                        "summary": "Vulnerability in angularjs version 1.2.12",
        //                        "desc": "Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12",
        //                        "urls": [{ "url": "http://example.com" }],
        //                        "extras": [
        //                            {
        //                                "url": "https://github.com/angular/angular.js/blob/b3b5015cb7919708ce179dc3d6f0d7d7f43ef621/CHANGELOG.md",
        //                                "title": "Some extra title 1"
        //                            },
        //                            {
        //                                "url": "http://avlidienbrunn.se/angular.txt",
        //                                "title": "Some extra title 3"
        //                            },
        //                            {
        //                                "url": "https://github.com/angular/angular.js/commit/b39e1d47b9a1b39a9fe34c847a81f589fba522f8",
        //                                "title": "Some extra title 333"
        //                            }
        //                        ]
        //                    },{
        //                        "severity": "medium",
        //                        "summary": "222Vulnerability in angularjs version 1.2.12",
        //                        "desc": "Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12",
        //                        "urls": [{ "url": "http://example.com" }],
        //                        "extras": [
        //                            {
        //                                "url": "https://github.com/angular/angular.js/blob/b3b5015cb7919708ce179dc3d6f0d7d7f43ef621/CHANGELOG.md",
        //                                "title": "Some extra title 1"
        //                            },
        //                            {
        //                                "url": "http://avlidienbrunn.se/angular.txt",
        //                                "title": "Some extra title 3"
        //                            },
        //                            {
        //                                "url": "https://github.com/angular/angular.js/commit/b39e1d47b9a1b39a9fe34c847a81f589fba522f8",
        //                                "title": "Some extra title 333"
        //                            }
        //                        ]
        //                    },{
        //                        "severity": "hi",
        //                        "summary": "222Vulnerability in angularjs version 1.2.12",
        //                        "desc": "Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12Vulnerability in angularjs version 1.2.12",
        //                        "urls": [{ "url": "http://example.com" }],
        //                        "extras": [
        //                            {
        //                                "url": "https://github.com/angular/angular.js/blob/b3b5015cb7919708ce179dc3d6f0d7d7f43ef621/CHANGELOG.md",
        //                                "title": "Some extra title 1"
        //                            },
        //                            {
        //                                "url": "http://avlidienbrunn.se/angular.txt",
        //                                "title": "Some extra title 3"
        //                            },
        //                            {
        //                                "url": "https://github.com/angular/angular.js/commit/b39e1d47b9a1b39a9fe34c847a81f589fba522f8",
        //                                "title": "Some extra title 333"
        //                            }
        //                        ]
        //                    }
        //                ]
        //            },
        //            {
        //                scan,
        //                id: '3',
        //                "type": "techs",
        //                "techs": [
        //                    {
        //                        "categories": [1],
        //                        "name": "angularjs",
        //                        "version": "1.2.12",
        //                        "confidence": 100
        //                    },
        //                    {
        //                        "categories": [1],
        //                        "name": "jquery",
        //                        "version": "1.11.1",
        //                        "confidence": 100
        //                    }
        //                ]
        //            }
        //        ]
        //    }]);
        //
        //    resolve();
        //});

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
