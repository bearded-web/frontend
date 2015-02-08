describe('TargetNavLink', function() {
    var componentPath = '../target-nav-link';

    jest.dontMock(componentPath);
    jest.dontMock('react-router');
    jest.dontMock('react/addons');
    jest.dontMock('react-router');
    jest.dontMock('react-bootstrap');

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
        var target = { web: { domain: 'heelo.com' }, summaryReport: { issues: {} } };

        component = TestUtils.renderIntoDocument(
            <TestWrapper component={Component} target={target} />
        );
    });

    xit('must call app.actions.toggleLeftPanel when clicked', function() {
        var link = TestUtils.findRenderedDOMComponentWithTag(component, 'a');

        TestUtils.Simulate.click(link);

        expect(appActions.toggleLeftPanel).toBeCalled();
    });

    it('must show label with high level warning and red label', function() {
        var target = {
            web: { domain: 'heelo.com' },
            summaryReport: {
                "issues": { "high": 2, "medium": 3, "info": 4 }
            }
        };

        component = TestUtils.renderIntoDocument(
            <TestWrapper component={Component} target={target} />
        );

        var label = TestUtils.findRenderedDOMComponentWithClass(component, 'label').getDOMNode();

        expect(label.innerHTML).toEqual('2');
        expect(label.className).toContain('danger');
    });

    it('must show label with medium warnings', function() {
        var target = {
            web: { domain: 'heelo.com' },
            summaryReport: {
                "issues": { "high": 0, "medium": 3, "info": 4 }
            }
        };

        component = TestUtils.renderIntoDocument(
            <TestWrapper component={Component} target={target} />
        );

        var label = TestUtils.findRenderedDOMComponentWithClass(component, 'label').getDOMNode();

        expect(label.innerHTML).toEqual('3');
        expect(label.className).toContain('warning');
    });

    it('must show label with info warnings', function() {
        var target = {
            web: { domain: 'heelo.com' },
            summaryReport: {
                "issues": { "high": 0, "medium": 0, "info": 4 }
            }
        };

        component = TestUtils.renderIntoDocument(
            <TestWrapper component={Component} target={target} />
        );

        var label = TestUtils.findRenderedDOMComponentWithClass(component, 'label').getDOMNode();

        expect(label.innerHTML).toEqual('4');
        expect(label.className).toContain('info');
    });

    it('must show no label if no issues', function() {
        var target = {
            web: { domain: 'heelo.com' },
            summaryReport: {
                "issues": { "high": 0, "medium": 0, "info": 0 }
            }
        };

        component = TestUtils.renderIntoDocument(
            <TestWrapper component={Component} target={target} />
        );

        var labels = TestUtils.scryRenderedDOMComponentsWithClass(component, 'label');

        expect(labels.length).toEqual(0);
    });
});
