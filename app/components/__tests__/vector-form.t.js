'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('VectorForm', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../vector-form', true);
        Component = require('../vector-form');

        instance = TestUtils.renderIntoDocument(
            <Component/>
        );
    });

    describe.skip('render', function() {
        it('should fail', function() {
            true.should.be.false;
        });
    });
});
