describe('ReportIssuesTotal', function() {
    var componentPath = '../report-issues-total';

    jest.dontMock(componentPath);
    jest.dontMock('react/addons');
    jest.setMock('../../../actions/report.actions', {
        selectSeverity: jest.genMockFunction()
    });


    var _ = require('lodash'),
        React,
        TestUtils,
        Component,
        component;

    beforeEach(function() {
        React = require('react/addons');
        Component = require(componentPath);
        TestUtils = React.addons.TestUtils;

        component = TestUtils.renderIntoDocument(
            <Component count={5} severity="low" />
        );
    });

    describe('click', function() {
        it('must call action report.selectSeverity with severity', function() {
            React.addons.TestUtils.Simulate.click(component.getDOMNode());

            var actions = require('../../../actions/report.actions');
            expect(actions.selectSeverity).toBeCalledWith('low');
        });

    });
});
