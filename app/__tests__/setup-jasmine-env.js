require('jasmine-reporters');
try {
    jasmine.VERBOSE = true;

    //var reporter = new jasmine.JUnitXmlReporter("output/");
    //jasmine.getEnv().addReporter(reporter);
    jasmine.VERBOSE = false;
    window.iget = function(text) {
        return text;
    };
    window.Promise = require('es6-promise').Promise;
    window._ = require('lodash');
    window.nextTick = function(fn) {
        setTimeout(fn, 0);
    };
    window.localStorage = {
        getItem() { return null }
    };
    var React = require('react/addons');

    var noop = function() {
    };
    var func = React.PropTypes.func;
    var TestWrapper = window.TestWrapper = React.createClass({
        childContextTypes: {
            router: React.PropTypes.object
        },

        getChildContext: function() {
            return {
                router: {
                    makePath: function() {
                    },
                    makeHref: function() {
                    },
                    isActive: function() {
                    }
                }
            };
        },


        render: function() {
            var props = this.props,
                Component = props.component;

            return <Component {...props} context={this.getChildContext()}/>;
        }
    });

    window.prepareTest = function(jest) {

    };

    var Jed = require('jed');
    window.i18n = new Jed({});
}
catch (e) {
    console.log(e.stack)
}
