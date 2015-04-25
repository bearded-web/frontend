'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { Map } from 'immutable';

describe('HttpBody', function() {
    let Component = null;
    let instance = null;
    let body = Map();

    beforeEach(function() {
        mockery.registerAllowable('../http-body', true);
        Component = require('../http-body');

        instance = TestUtils.renderIntoDocument(
            <Component body={body}/>
        );
    });

    describe('render', function() {
        it.skip('should fail', function() {
            true.should.be.false;
        });
    });
});
