'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('IssueGeneralForm', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../issue-general-form', true);
        Component = require('../issue-general-form');

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
