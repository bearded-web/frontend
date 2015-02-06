describe('RawReports', function() {

    var React,
        TestUtils,
        Component,
        component,
        reports = getReports();

    beforeEach(function() {
        var tools = init('../raw-reports');

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

    describe('.getRawReportsFromReports()', function() {


        it('must raw reports items', function() {
            var raws = component.getRawReportsFromReports(reports);

            expect(raws.length).toEqual(1);
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
                    },
                    {
                        id: '54d39590c168ae527a000007',
                        type:'raw',
                        created:'2015-02-05T13:08:48.869-03:00',
                        updated:'2015-02-05T13:08:48.869-03:00',
                        scan:'54d3958dc168ae527a000005',
                        scanSession:'54d3958dc168ae527a000003',
                        raw:'[{"url":"http://slonoed.net","finalUrl":"http://slonoed.net","application":"Google Analytics","confidence":100,"version":"","categories":["analytics","font-scripts"]},{"url":"http://slonoed.net","finalUrl":"http://slonoed.net","application":"Google Font API","confidence":100,"version":"","categories":["analytics","font-scripts"]}]'
                    }
                ]
            }];
}
