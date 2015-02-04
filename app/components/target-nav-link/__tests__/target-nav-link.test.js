describe('TargetNavLink', function() {
    var componentPath = '../target-nav-link';

    jest.dontMock(componentPath);
    jest.dontMock('react-router');
    jest.dontMock('react/addons');
    jest.dontMock('react-router');

    var React,
        TestUtils,
        Component,
        component,
        Link,
        appActions;

    beforeEach(function() {
        React = require('react/addons');
        Component = require(componentPath);
        TestUtils = React.addons.TestUtils;
        Link = require('react-router').Link;
        appActions = require('../../../actions/app.actions');
        var target = {web:{domain: 'heelo.com'}};

        component = TestUtils.renderIntoDocument(
            <TestWrapper component={Component} target={target} />
        );
    });

    xit('must call app.actions.toggleLeftPanel when clicked', function() {
        var link = TestUtils.findRenderedDOMComponentWithTag(component, 'a');

        TestUtils.Simulate.click(link);

        expect(appActions.toggleLeftPanel).toBeCalled();
    });
});
