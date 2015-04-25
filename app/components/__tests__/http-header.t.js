'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('HttpHeader', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../http-header', true);
        Component = require('../http-header');

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
