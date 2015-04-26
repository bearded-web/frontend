'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('TransactionForm', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../transaction-form', true);
        Component = require('../transaction-form');

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
