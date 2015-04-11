'use strict';

import { Map, fromJS, OrderedMap } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import { MEDIUM } from '../../lib/severities';


describe('IssuesListFilter', function() {
    let Component = null;
    let instance = null;
    let updateSort = null;
    let select = null;

    beforeEach(function() {
        updateSort = spy();

        mockery.registerMock('../actions/issues.actions', {
            updateSort
        });

        mockery.registerAllowable('../issues-list-sort', true);
        Component = require('../issues-list-sort');

        instance = TestUtils.renderIntoDocument(
            <Component sortBy="severity"/>
        );

        select = findDOMNode(byTag(instance, 'select')[0]);
    });

    describe('render', function() {
        it('should render select with value=severity', function() {
            select.value.should.be.eql('severity');
        });
    });

    describe('.onChange()', function() {
        it('should call updateSort action', function() {
            const sortBy = 'created';

            select.value = sortBy;
            Simulate.change(select, {});

            updateSort.should.be.calledWith(sortBy);
        });
    });
});
