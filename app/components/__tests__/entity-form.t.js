'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe.skip('EntityForm', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../entity-form', true);
        Component = require('../entity-form');

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
