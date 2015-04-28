'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('HeadersForm', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../headers-form', true);
        Component = require('../headers-form');

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
