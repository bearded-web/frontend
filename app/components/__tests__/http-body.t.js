'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('HttpBody', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../http-body', true);
        Component = require('../http-body');

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
