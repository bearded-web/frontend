'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import issuesStore from '../stores/issues.store';
import issuesListStore from '../stores/issues-list.store';
import { loadForTarget, updateFilter } from '../actions/issues.actions';
import { bindAll, filter as lFilter } from 'lodash';
import { Map } from 'immutable';

import { Row, Col } from 'react-bootstrap';
import IssuesList from './issues-list';
import IssuesListFilter from './issues-list-filter';
import IssuesListSort from './issues-list-sort';

let targetId = null;

export default class IssuesPage extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onStoreChange',
            'onFilterChange'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;

        this.state = this.getState();
    }

    componentDidMount() {
        issuesStore.onChange(this.onStoreChange);
        issuesListStore.onChange(this.onStoreChange);

        const { target } = this.context.router.getCurrentQuery();
        loadForTarget({ target });

        targetId = target;
    }

    componentWillUnmount() {
        issuesStore.offChange(this.onStoreChange);
        issuesListStore.offChange(this.onStoreChange);

        updateFilter(Map({
            severity: 'all',
            type: 'all'
        }));
    }

    onStoreChange() {
        this.setState(this.getState());
    }

    getState() {
        const state = issuesListStore.getState();

        state.issues = issuesListStore.getIssues();

        return state;
    }

    onFilterChange(filter) {
        updateFilter(filter);
    }

    render() {
        const { issues, filter, sortBy } = this.state;

        return <Row>
            <br/>
            <Col xs={12}>
                <IssuesListFilter filter={filter} onChange={this.onFilterChange}/>
            </Col>
            <Col xs={12} md={4} lg={3}>
                <IssuesListSort sortBy={sortBy}/>
            </Col>
            <Col xs={12}>
                <IssuesList issues={issues}/>
            </Col>
        </Row>;
    }
}

IssuesPage.propTypes = {};
IssuesPage.contextTypes = {
    router: PropTypes.func
};

if (module.hot) {
    module.hot.accept([
        '../actions/issues.actions'
    ], function() {
        loadForTarget(targetId);
    });
}
