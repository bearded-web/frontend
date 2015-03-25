describe('TargetScan', function() {
    jest.dontMock('../target-scan');
    jest.dontMock('react-router');
    jest.dontMock('react/addons');
    jest.dontMock('../../../flux');
    jest.setMock('../../../stores/store', function() {});

    var _ = require('lodash');

    var React,
        TestUtils,
        Link,
        TargetScan,
        flux;

    beforeEach(function() {
        React = require('react/addons');
        Link = require('react-router').Link;
        TargetScan = require('../target-scan');
        TestUtils = React.addons.TestUtils;
        flux = require('../../../flux');
    });


    xit('must display "Show report" button if finished', function() {
        var scan = {
            status: 'finished',
            sessions: []
        };


        var targetScan = TestUtils.renderIntoDocument(
            <TestWrapper component={TargetScan} scan={scan} />
        );

        var link = TestUtils.findRenderedComponentWithType(targetScan, Link).getDOMNode();

        expect(link.innerHTML).toEqual(iget('Show report'));
    });

    xit('must display "Scan failed" if failed', function() {
        var scan = {
            status: 'failed',
            sessions: []
        };


        var targetScan = TestUtils.renderIntoDocument(
            <TestWrapper component={TargetScan} scan={scan} />
        );


        var fail = TestUtils.findRenderedDOMComponentWithClass(targetScan, 'c-target-scan--fail').getDOMNode();

        expect(fail.innerHTML).toContain(iget('Scan failed'));
    });

    xit('must display "Show progress" button if working', function() {
        var scan = {
            status: 'working',
            sessions: []
        };


        var targetScan = TestUtils.renderIntoDocument(
            <TestWrapper component={TargetScan} scan={scan} />
        );


        var link = TestUtils.findRenderedComponentWithType(targetScan, Link).getDOMNode();

        expect(link.innerHTML).toEqual(iget('Show progress'));
    });
});
