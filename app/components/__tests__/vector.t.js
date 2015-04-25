'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { Map } from 'immutable';

describe('Vector', function() {
    const vector = Map();

    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../vector', true);
        Component = require('../vector');

        instance = TestUtils.renderIntoDocument(
            <Component vector={vector}/>
        );
    });

    describe('render', function() {
        it.skip('should fail', function() {
            true.should.be.false;
        });
    });
});
