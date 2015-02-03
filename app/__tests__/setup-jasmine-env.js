jasmine.VERBOSE = true;
var _ = require('lodash');
require('jasmine-reporters');
var reporter = new jasmine.JUnitXmlReporter("output/");
jasmine.getEnv().addReporter(reporter);
jasmine.VERBOSE = false;
window.iget = function(text) {
    return text;
};
window.Promise = require('es6-promise').Promise;
var React = require('react/addons');

var TestWrapper = window.TestWrapper = React.createClass({
    childContextTypes: {
        currentPath: React.PropTypes.string,
        makePath: React.PropTypes.func.isRequired,
        makeHref: React.PropTypes.func.isRequired,
        transitionTo: React.PropTypes.func.isRequired,
        replaceWith: React.PropTypes.func.isRequired,
        goBack: React.PropTypes.func.isRequired,
        isActive: React.PropTypes.func.isRequired,
        activeRoutes: React.PropTypes.array.isRequired,
        activeParams: React.PropTypes.object.isRequired,
        activeQuery: React.PropTypes.object.isRequired,
        location: React.PropTypes.object,
        routes: React.PropTypes.array.isRequired,
        namedRoutes: React.PropTypes.object.isRequired,
        scrollBehavior: React.PropTypes.object,
        routeHandlers: React.PropTypes.array.isRequired,
        getRouteAtDepth: React.PropTypes.func.isRequired,
        getRouteComponents: React.PropTypes.func.isRequired,
        getCurrentParams: React.PropTypes.func.isRequired
    },

    getChildContext: function() {
        return _.assign({
            currentPath: '__STUB__',
            makePath: function() {
            },
            makeHref: function() {
                return '__STUB__';
            },
            transitionTo: function() {
            },
            replaceWith: function() {
            },
            goBack: function() {
            },
            isActive: function() {
            },
            activeRoutes: [],
            activeParams: {},
            activeQuery: {},
            location: {},
            routes: [],
            namedRoutes: {},
            scrollBehavior: {},
            routeHandlers: [{}],
            getRouteAtDepth: function() {},
            getRouteComponents: function() { return {}; },
            getCurrentParams: function() {}

        }, this.props.contextStubs);
    },

    render: function() {
        var props = this.props,
            Component = props.component;
        //this.props.ref = '__subject__';
        return <Component {...props} />;
    }
});
