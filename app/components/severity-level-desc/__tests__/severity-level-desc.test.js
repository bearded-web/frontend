'use strict';
describe('SeverityLevelDesc', function() {
    var componentPath = '../severity-level-desc';

    jest.dontMock(componentPath);
    jest.dontMock('react/addons');
    jest.dontMock('../../../lib/i18n');

    var React,
        TestUtils,
        Component,
        component;

    beforeEach(function() {
        React = require('react/addons');
        Component = require(componentPath);
        TestUtils = React.addons.TestUtils;

        component = TestUtils.renderIntoDocument(
            <Component />
        );
    });

    describe('method', function() {
        it('spec', function() {

        });
    });
});
