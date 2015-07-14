/**
 * IssuesPagination connect to issuesListStore and render pagination
 */
//TODO replace with RoutedPagination
import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import connectToStores from '../lib/connectToStores';
import usersListStore from '../stores/usersListStore';
import autobind from '../lib/autobind';
import { cloneDeep } from 'lodash';

import Pagination from './Pagination';

function getState() {
    const { count, pageSize } = usersListStore.getState();

    return { count, pageSize };
}

@connectToStores([usersListStore], getState)
export default class IssuesPagination extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired
    };
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    onPageSelect(page) {
        const query = cloneDeep(this.context.router.getCurrentQuery());
        query.page = page;
        this.context.router.transitionTo('users', {}, query);
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
