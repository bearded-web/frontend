'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('HttpEntity', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../http-entity', true);
        Component = require('../http-entity');

        instance = TestUtils.renderIntoDocument(
            <Component/>
        );
    });

    describe('render', function() {
        it.skip('should fail', function() {
            true.should.be.false;
        });
    });
});
