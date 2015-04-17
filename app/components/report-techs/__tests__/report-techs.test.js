'use strict';
describe('ReportIssues', function() {

    var React,
        TestUtils,
        Component,
        component,
        reports = getReports();

    beforeEach(function() {
        var tools = init('../report-techs');

        React = tools.React;
        Component = tools.Component;
        TestUtils = tools.TestUtils;

        component = TestUtils.renderIntoDocument(
            <Component reports={reports} />
        );
    });

    function init(path) {
        jest.dontMock(path);
        jest.dontMock('react/addons');

        var React =  require('react/addons');
        return {
            React,
            Component: require(path),
            TestUtils: React.addons.TestUtils
        };
    }

    describe('.getIssuesFromReports()', function() {


        it('must return medium field as array with one issue', function() {
            var techs = component.getTechsFromReports(reports);

            expect(techs.length).toEqual(2);
        });

    });
});

function getReports() {
    return [{
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
            }];
}
