'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('HttpTransaction', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../http-transaction', true);
        Component = require('../http-transaction');

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
