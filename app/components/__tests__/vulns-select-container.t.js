'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { Map } from 'immutable';

describe('VulnsSelectContainer', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerMock('../stores/vulns.store', createStoreMock({
            vulns: Map()
        }));

        mockery.registerAllowable('../vulns-select-container', true);
        Component = require('../vulns-select-container');

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
