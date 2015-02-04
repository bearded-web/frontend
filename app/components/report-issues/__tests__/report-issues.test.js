describe('ReportIssues', function() {
    jest.dontMock('../report-issues');
    jest.dontMock('react/addons');

    var _ = require('lodash');

    var React,
        TestUtils,
        ReportIssues,
        component,
        reports = [{
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

    beforeEach(function() {
        React = require('react/addons');
        ReportIssues = require('../report-issues');
        TestUtils = React.addons.TestUtils;

        component = TestUtils.renderIntoDocument(
            <ReportIssues reports={reports} />
        );
    });

    describe('mergeIssues', function() {
        it('must merge issues from target to source', function() {
            var target = {
                    a: [1],
                    b: [2]
                },
                source = {
                    b: [3],
                    c: [4]
                };

            component.mergeIssues(target, source);

            expect(target.a.length).toEqual(1);
            expect(target.b.length).toEqual(2);
            expect(target.c.length).toEqual(1);
        });
    });

    describe('.getIssuesFromReports()', function() {


        it('must return object with low, medium, hi field', function() {
            var { low, medium, hi } = component.getIssuesFromReports(reports);

            expect(_.isArray(low)).toBeTruthy();
            expect(_.isArray(medium)).toBeTruthy();
            expect(_.isArray(hi)).toBeTruthy();
        });

        it('must return medium field as array with one issue', function() {
            var { medium } = component.getIssuesFromReports(reports);

            expect(medium.length).toEqual(1);
            expect(medium[0].summary).toBe('Vulnerability in angularjs version 1.2.12');
        });

    });

    describe('.setDefaultSeverity()', function() {
        var actions;

        beforeEach(function() {
            actions = require('../../../actions/report.actions');
        });

        xit('must do nothing if severity if defined', function() {
            component.setDefaultSeverity('hi');
        });

        it('must call action selectSeverity with "hi" if has hi severities', function() {
            component.setDefaultSeverity('', {
                low: [],
                medium: [],
                hi: [1]
            });

            expect(actions.selectSeverity).toBeCalledWith('hi');
        });

        xit('must call action selectSeverity with "medium" if no hi severities and has medium', function() {
            component.setDefaultSeverity('', {
                low: [],
                medium: [1],
                hi: []
            });

            expect(actions.selectSeverity).toBeCalledWith('medium');
        });
    });
});
