'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('Vector', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../vector', true);
        Component = require('../vector');

        instance = TestUtils.renderIntoDocument(
            <Component/>
        );
    });

    describe('render', function() {
        it('should fail', function() {
            true.should.be.false;
        });
    });
});
