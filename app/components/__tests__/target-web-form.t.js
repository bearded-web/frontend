'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('TargetWebForm', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../target-web-form', true);
        Component = require('../target-web-form');

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
