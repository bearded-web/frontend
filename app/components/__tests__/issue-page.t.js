'use strict';

import { is, Map, List, fromJS } from 'immutable';
import { spy, stub } from 'sinon';
import mockery from 'mockery';
import { Component } from 'react/addons';
import { HIGH, MEDIUM, LOW } from '../../lib/severities';
import Issue from '../issue';

describe('IssuePage', function() {
    const issueId = 'seom issue id';
    const issues = fromJS([
        { severity: HIGH },
        { severity: MEDIUM },
        { severity: LOW }
    ]);

    let fetchOne = null;
    let instance = null;
    let Component = null;

    beforeEach(function() {
        fetchOne = spy();

        mockery.registerMock('../actions/issues.actions', {
            fetchOne
        });
        mockery.registerMock('../stores/issues.store', {
            onChange: spy(),
            getIssues: () => issues
        });

        mockery.registerAllowable('../issue-page', true);
        Component = require('../issue-page');

        const Subject = stubRouterContext(Component, {}, {
            getCurrentParams: stub().returns({ issueId })
        });
        instance = TestUtils.renderIntoDocument(
            <Subject/>
        );
    });

    describe('.componentDidMount()', function() {
        it('should call issues action fetchOne', function() {
            fetchOne.should.be.calledWith(issueId);
        });
    });

    describe('render', function() {
         it('should contain Issue', function() {
             byType(instance, Issue).should.have.length(1);
         });
     });

});
