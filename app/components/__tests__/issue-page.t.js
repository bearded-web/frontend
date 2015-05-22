'use strict';

import { is, Map, List, fromJS } from 'immutable';
import { spy, stub } from 'sinon';
import mockery from 'mockery';
import { Component } from 'react/addons';
import { HIGH, MEDIUM, LOW } from '../../lib/severities';

describe('IssuePage', function() {
    const issueId = 'seom issue id';
    const issues = fromJS([
        { vector: {}, severity: HIGH },
        { vector: {}, severity: MEDIUM },
        { vector: {}, severity: LOW }
    ]);
    const issue = fromJS({
        id: 'some id',
        vector: {},
        severity: HIGH
    });

    let fetchOne = null;
    let instance = null;
    let Component = null;

    beforeEach(function() {
        fetchOne = spy();

        mockery.registerMock('../actions/issuesActions', {
            fetchOne
        });
        mockery.registerMock('../stores/issues.store', {
            onChange: spy(),
            getIssues: () => issues
        });

        mockery.registerAllowable('../issue-page', true);
        Component = require('../issue-page');

        const Subject = stubRouterContext(Component, { issue }, {
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
            byType(instance, require('../issue')).should.have.length(1);
        });
    });

});
