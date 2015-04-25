'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('Widget', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../widget', true);
        Component = require('../widget');

        instance = TestUtils.renderIntoDocument(
            <Component type="danger"/>
        );
    });

    describe('render', function() {
        it('should add red-bg class', function() {
            findDOMNode(instance).className.should.contain('red-bg');
        });
    });
});
