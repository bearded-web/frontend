'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('Issue_', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../markdown', true);
        Component = require('../markdown');
    });

    describe('render', function() {
        it('should render b', function() {
            const md = '**hello**';

            instance = TestUtils.renderIntoDocument(
                <Component text={md}/>
            );

            findDOMNode(instance).innerHTML.should.contain('<strong>hello</strong>');
        });
    });
});
