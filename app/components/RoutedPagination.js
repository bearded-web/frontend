/**
 * RoutedPagination
 */

import { PropTypes, Component } from 'react';
import { cloneDeep } from 'lodash';

import Pagination from './Pagination';

export default class RoutedPagination extends Component {
    static contextTypes = {
        router: PropTypes.func.isRequired
    };

    onPageSelect = (page) => {
        const { router } = this.context;
        const query = cloneDeep(router.getCurrentQuery());
        query.page = page;
        this.context.router.transitionTo(
            router.getCurrentPathname(),
            router.getCurrentParams(),
            query
        );
    }

    render() {
        return <Pagination onPageSelect={this.onPageSelect} {...this.props}/>;
    }
}
