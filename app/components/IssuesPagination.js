/**
 * IssuesPagination connect to issuesListStore and render pagination
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import connectToStores from '../lib/connectToStores';
import issuesListStore from '../stores/issuesListStore';
import { fetchPage } from '../actions/issuesActions';
import autobind from '../lib/autobind';

import Pagination from './Pagination';

function getState() {
    const { count, page, pageSize } = issuesListStore.getState();

    return { count, page, pageSize };
}

@connectToStores([issuesListStore], getState)
export default class IssuesPagination extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        targetId: PropTypes.string.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    onPageSelect(page) {
        const target = this.props.targetId;

        fetchPage({ target, page });
    }

    render() {
        const { count, page, pageSize } = this.props;

        return <Pagination
            onPageSelect={this.onPageSelect}
            count={count}
            pageSize={pageSize}
            page={page}/>;
    }
}

