/**
 * Mocha env setup
 */

'use strict';

import jsdom from 'mocha-jsdom';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

jsdom();

before(function() {
    global.window.localStorage = {
        getItem() {
            return null;
        }
    };
});

global.iget = a => a;

global.React = require('react/addons');
global.TestUtils = React.addons.TestUtils;
global.byTag = global.TestUtils.scryRenderedDOMComponentsWithTag;
global.byClass = global.TestUtils.scryRenderedDOMComponentsWithClass;
global.findDOMNode = React.findDOMNode;
