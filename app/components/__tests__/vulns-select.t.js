'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('VulnsSelect', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../vulns-select', true);
        Component = require('../vulns-select');

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
