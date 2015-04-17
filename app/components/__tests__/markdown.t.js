'use strict';

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
        it('should render empty', function() {
            const md = '';

            instance = TestUtils.renderIntoDocument(
                <Component text={md}/>
            );

            findDOMNode(instance).innerHTML.should.be.eql('');
        });
    });
});
