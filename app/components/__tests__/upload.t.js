'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe.skip('Upload', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../upload', true);
        Component = require('../upload');

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
