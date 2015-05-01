'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('TargetAndroidForm', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../target-android-form', true);
        Component = require('../target-android-form');

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
