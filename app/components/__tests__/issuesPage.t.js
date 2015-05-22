import { is, Map, List, fromJS } from 'immutable';
import { spy, stub } from 'sinon';
import mockery from 'mockery';
import { Component } from 'react/addons';
import { HIGH, MEDIUM, LOW } from '../../lib/severities';

describe('IssuesPage', function() {
    let fetchPage = null;
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
        fetchPage = spy();
        updateFilter = spy();

        mockery.registerMock('../actions/issuesActions', {
            fetchPage,
            updateFilter
        });
        mockery.registerMock('../stores/issues.store', {
            onChange: spy()
        });
        mockery.registerMock('../stores/issuesListStore', {
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

        mockery.registerAllowable('../IssuesPage', true);
        IssuesPage = require('../IssuesPage');

        const Subject = stubRouterContext(IssuesPage, {}, {
            getCurrentQuery: stub().returns({ target })
        });
        issuesPage = TestUtils.renderIntoDocument(
            <Subject/>
        );
    });

    //TODO add tests


});
