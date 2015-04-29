/**
 * Mocha env setup
 */

'use strict';

/*eslint react/no-multi-comp:0*/

import jsdom from 'mocha-jsdom';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import mockery from 'mockery';
import { spy } from 'sinon';
import { assign, mapValues, isObject, isString } from 'lodash';

require.extensions['.png'] = function(m, filename) {
    return m._compile('1', filename);
};

global.should = chai.should();
chai.use(sinonChai);

jsdom();

before(function() {
    global.window.localStorage = {
        getItem() {
            return null;
        }
    };
});

beforeEach(() => {
    mockery.enable({
        warnOnReplace: true,
        warnOnUnregistered: false,
        useCleanCache: false
    });
});

afterEach(() => {
    mockery.deregisterAll();
    mockery.disable();
});


global.iget = a => a;
global.React = require('react/addons');
global.TestUtils = React.addons.TestUtils;
global.byType = global.TestUtils.scryRenderedComponentsWithType;
global.byTag = global.TestUtils.scryRenderedDOMComponentsWithTag;
global.byClass = global.TestUtils.scryRenderedDOMComponentsWithClass;
global.findDOMNode = React.findDOMNode;
global.Simulate = global.TestUtils.Simulate;

const nodeExtractor = (foo) => (i, param) => foo(i, param).map(global.findDOMNode);
global.nodeByType = nodeExtractor(global.byType);
global.nodeByTag = nodeExtractor(global.byTag);
global.nodeByClass = nodeExtractor(global.byClass);
global.showError = function() {
    console.error(...arguments);
};


global.stubRouterContext = (Component, props, stubs) => {
    function RouterStub() {
    }

    assign(RouterStub, {
        makePath: spy(),
        makeHref: spy(),
        transitionTo: spy(),
        replaceWith: spy(),
        goBack: spy(),
        getCurrentPath: spy(),
        getCurrentRoutes: spy(),
        getCurrentPathname: spy(),
        getCurrentParams: spy(),
        getCurrentQuery: spy(),
        isActive: spy()
    }, stubs);

    return React.createClass({
        childContextTypes: {
            router: React.PropTypes.func
        },

        getChildContext () {
            return {
                router: RouterStub
            };
        },

        render () {
            return <Component {...props} />;
        }
    });
};

global.stubContext = (Component, props, context) => {
    const types = mapValues(context, v => {
        if (isObject(v)) return React.PropTypes.object;
    });

    return React.createClass({
        childContextTypes: types,

        getChildContext () {
            return context;
        },

        render () {
            return <Component {...props} />;
        }
    });
};

global.storeMock = {
    getState: spy(() => ({})),
    onChange: spy(),
    offChange: spy()
};
global.createStoreMock = function(state) {
    return {
        getState: spy(() => state),
        onChange: spy(),
        offChange: spy()
    };
};

class MockComponent extends React.Component {
    render() {
        const { children } = this.props;

        return <div {...this.props}>
            {children}
        </div>;
    }
}
MockComponent.propTypes = {
    children: React.PropTypes.node
};
global.MockComponent = MockComponent;

class FakePromise {
    /**
     * New FakePromise
     * @param {Boolean} resolve call then
     * @param {Boolean} reject call catch
     * @param {*} value resolve value
     * @param {*} error reject value
     */
    constructor(resolve, reject, value, error) {
        this.resolve = resolve;
        this.reject = reject;

        this.value = value;
        this.error = error;
    }

    then(handler) {
        if (this.resolve) {
            this.value = handler(this.value);
        }

        return this;
    }

    'catch'(handler) {
        if (this.reject) {
            handler(this.error);
        }

        return this;
    }
}
global.FakePromise = FakePromise;
