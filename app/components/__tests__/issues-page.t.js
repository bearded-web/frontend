'use strict';

import { is, Map, List, fromJS } from 'immutable';
import { spy, stub } from 'sinon';
import mockery from 'mockery';
import { Component } from 'react/addons';
import { HIGH, MEDIUM, LOW } from '../../lib/severities';

describe('IssuesPage', function() {
    let loadForTarget = null;
    let updateFilter = null;

    const target = 'targetId1';
    const issues = fromJS([
        { severity: HIGH },
        { severity: MEDIUM },
        { severity: LOW }
    ]);

    let issuesPage = null;
    let IssuesPage = null;
    let subRender = null;
    let IssuesListFilter = null;


    beforeEach(function() {
        loadForTarget = spy();
        updateFilter = spy();

        mockery.registerMock('../actions/issues.actions', {
            loadForTarget,
            updateFilter
        });
        mockery.registerMock('../stores/issues.store', {
            onChange: spy()
        });
        mockery.registerMock('../stores/issues-list.store', {
            onChange: spy(),
            getIssues: (...ids) => issues,
            getState: stub().returns({
                issues: issues,
                filter: Map({
                    severity: 'all'
                })
            })
        });

        subRender = spy();
        class Fake extends Component {
            render() {
                subRender(this.props, this.state);

                return <span></span>;
            }
        }
        mockery.registerMock('./issues-list', Fake);

        mockery.registerAllowable('../issues-list-filter', true);
        IssuesListFilter = require('../issues-list-filter');

        mockery.registerAllowable('../issues-page', true);
        IssuesPage = require('../issues-page');

        const Subject = stubRouterContext(IssuesPage, {}, {
            getCurrentQuery: stub().returns({ target })
        });
        issuesPage = TestUtils.renderIntoDocument(
            <Subject/>
        );
    });

    describe('.componentDidMount()', function() {
        it('should call issues action loadForTarget', function() {
            loadForTarget.should.be.calledWith({ target });
        });
    });

    describe('.render()', function() {
        it('must pass issues to IssuesList', function() {
            subRender.args[0][0].issues
                .should.eql(issues);
        });

        it('should render IssuesListFilter', function() {
            byTag(issuesPage, 'select')
                .should.have.length.above(1);
        });

        it('should render issues with filter', function() {
            //TODO add test
        });
    });

    describe('.onFilterChange()', function() {
        it('should call updateFilter action', function() {
            const filter = Map();

            byType(issuesPage, IssuesPage)[0].onFilterChange(filter);
            updateFilter.should.be.calledWith(filter);
        });
    });


});
