import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import issuesStore from '../stores/issues.store';
import issuesListStore from '../stores/issuesListStore';
import { fetchPage, updateFilter } from '../actions/issuesActions';
import { Map } from 'immutable';
import setTitle from '../lib/set-title';
import bind from '../lib/autobind';
import connectToStores from '../lib/connectToStores';

import { Row, Col } from 'react-bootstrap';
import IssuesList from './IssuesList';
import Fa from './fa';
import IssuesPagination from './IssuesPagination';
import IssuesStatusFilter from './IssuesStatusFilter';
import Ibox, { IboxContent, IboxTitle } from './ibox';
import IssuesSummaryFilter from './IssuesSummaryFilter';
import IssuesSeverityFilter from './IssuesSeverityFilter';
import IssuesVulnTypeFilter from './IssuesVulnTypeFilter';

let targetId = null;

function getState() {
    const state = issuesListStore.getState();
    const ids = state.issues.toArray();
    state.issues = issuesStore.getIssues(...ids);

    return state;
}

@connectToStores([issuesStore, issuesListStore], getState)
export default class IssuesPage extends Component {
    static propTypes = {
        issues: PropTypes.object,
        filter: PropTypes.object,
        loading: PropTypes.bool,
        routeQuery: PropTypes.object
    };
    static contextTypes = {
        router: PropTypes.func
    };

    shouldComponentUpdate = shouldComponentUpdate;

    componentDidMount() {
        setTitle(iget('Issues'));

        const { target } = this.context.router.getCurrentQuery();
        fetchPage({ target });
    }

    componentWillReceiveProps(newProps) {
        const newTarget = newProps.routeQuery && newProps.routeQuery.target;
        const target = this.props.routeQuery && this.props.routeQuery.target;

        if (newTarget !== target) {
            fetchPage({ target: newTarget });
        }
    }

    componentWillUnmount() {
        updateFilter(Map({
            severity: 'all',
            type: 'all'
        }));
    }

    @bind
    onFilterChange(filter) {
        updateFilter(filter);
    }

    render() {
        const { issues, filter, loading } = this.props;
        const target = this.props.routeQuery && this.props.routeQuery.target;

        return <Row>
            <br/>

            <Col xs={12} md={4} lg={3}>
                <Ibox>
                    <IboxTitle>
                        <h5>{iget('Filters')}</h5>
                    </IboxTitle>
                    <IboxContent>
                        <IssuesSummaryFilter filter={filter}/>
                        <IssuesSeverityFilter filter={filter}/>
                        <IssuesVulnTypeFilter filter={filter}/>
                    </IboxContent>
                </Ibox>
                <Ibox>
                    <IboxTitle>
                        <h5>{iget('Status')}</h5>
                    </IboxTitle>
                    <IboxContent>
                        <IssuesStatusFilter filter={filter}/>
                    </IboxContent>
                </Ibox>
            </Col>
            <Col xs={12} md={8} lg={9}>
                <Ibox>
                    <IboxContent>

                        <div className="pull-right">
                            <IssuesPagination targetId={target}/>
                        </div>
                    </IboxContent>
                </Ibox>
            </Col>
        </Row>;
    }

    @bind
    renderLoading() {
        return <h1 className="text-center">
            <Fa icon="refresh" spin fw/>
            {iget('Loading')}
        </h1>;
    }
}


if (module.hot) {
    module.hot.accept([
        '../actions/issuesActions'
    ], function() {
        fetchPage(targetId);
    });
}
