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
window._ = require('lodash');
window.nextTick = function(fn) {
    setTimeout(fn, 0);
};
var React = require('react/addons');

var noop = function() {
};
var func = React.PropTypes.func;
var TestWrapper = window.TestWrapper = React.createClass({
    childContextTypes: {
        currentPath: React.PropTypes.string,
        makePath: func,
        makeHref: func,
        transitionTo: func,
        replaceWith: func,
        goBack: func,
        isActive: func,
        activeRoutes: React.PropTypes.array,
        activeParams: React.PropTypes.object,
        activeQuery: React.PropTypes.object,
        location: React.PropTypes.object,
        routes: React.PropTypes.array,
        namedRoutes: React.PropTypes.object,
        scrollBehavior: React.PropTypes.object,
        routeHandlers: React.PropTypes.array,
        getRouteAtDepth: func,
        getRouteComponents: func,
        getCurrentQuery: func,
        getCurrentPathname: func,
        getCurrentPath: func,
        getCurrentRoutes: func,
        getCurrentParams: func
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
            getRouteAtDepth: noop,
            getRouteComponents: noop,
            getCurrentQuery: noop,
            getCurrentPathname: noop,
            getCurrentPath: noop,
            getCurrentRoutes: noop,
            getCurrentParams: noop

        }, this.props.contextStubs);
    },

    render: function() {
        var props = this.props,
            Component = props.component;
        //this.props.ref = '__subject__';
        return <Component {...props} />;
    }
});

window.prepareTest = function(jest) {

};

var Jed = require('jed');
window.i18n = new Jed({});
