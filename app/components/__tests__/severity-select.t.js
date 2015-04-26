'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('SeveritySelect', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../severity-select', true);
        Component = require('../severity-select');

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
