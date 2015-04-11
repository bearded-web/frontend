'use strict';

import { Map, fromJS, OrderedMap } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import { MEDIUM } from '../../lib/severities';


describe('IssuesListFilter', function() {
    const filter = Map({
        severity: MEDIUM,
        type: 'all'
    });

    let IssuesListFilter = null;
    let issuesListFilter = null;

    let onChange = null;

    beforeEach(function() {
        onChange = spy();

        mockery.registerAllowable('../issues-list-filter', true);
        IssuesListFilter = require('../issues-list-filter');

        issuesListFilter = TestUtils.renderIntoDocument(
            <IssuesListFilter filter={filter} onChange={onChange}/>
        );
    });

    describe('render', function() {
        it('should render severity and types selects', function() {
            byTag(issuesListFilter, 'select')
                .should.have.length.within(1, 2);
        });

        it('should render severity from prop', function() {
            findDOMNode(byTag(issuesListFilter, 'select')[0]).value
                .should.be.eql(MEDIUM);
        });
    });

    describe('onChange', function() {
        it('should call on change when selects changed', function() {
            const node = findDOMNode(byTag(issuesListFilter, 'select')[0]);

            Simulate.change(node, {});

            onChange.should.be.calledOnce;
        });
        it('should call on change when search changed', function() {
            const node = findDOMNode(byTag(issuesListFilter, 'input')[0]);

            Simulate.change(node, {});

            onChange.should.be.calledOnce;
        });
    });
});
