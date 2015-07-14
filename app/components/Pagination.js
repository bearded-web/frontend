/**
 * Pagination
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { NaturalNumber, NaturalNumberWithZero } from '../lib/types';
import { noop } from 'lodash';
import classnames from 'classnames';
import { create as createStyle } from 'react-style';

import Fa from './fa';

const S = createStyle({
    ul: { margin: 0 }
});

export default class Pagination extends Component {
    static propTypes = {
        count: NaturalNumberWithZero,
        pageSize: NaturalNumber,
        size: PropTypes.string,
        onPageSelect: PropTypes.func.isRequired,
        maxLinks: PropTypes.number,
        page: PropTypes.number
    };
    static defaultProps = {
        size: '',
        onPageSelect: noop,
        maxLinks: 10,
        page: 1
    };

    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { count, pageSize, page, maxLinks, ...restProps } = this.props;
        const maxPages = pageSize ? Math.ceil(count / pageSize) : 1;

        let first = Math.ceil(page - maxLinks / 2);
        first = Math.max(1, first);

        let last = first + maxLinks - 1;

        if (last > maxPages) {
            last = maxPages;
            first = Math.max(1, last - maxLinks + 1);
        }

        const links = [];

        if (first < last) {
            for (let link = first; link <= last; link++) {
                links.push(this.renderLink(link, page === link));
            }
        }
        else {
            links.push(this.renderLink(1, true));
        }

        if(first > 1) {
            links.unshift(<li>
                <a ref="goToFirst"
                   onClick={() => this.props.onPageSelect(1)}
                   title={iget('Go to first page')}>
                    <Fa icon="angle-double-left"/>
                </a>
            </li>);
        }

        if(last < maxPages) {
            links.push(<li>
                <a ref="goToLast"
                   onClick={() => this.props.onPageSelect(maxPages)}
                   title={iget('Go to last page')}>
                    <Fa icon="angle-double-right"/>
                </a>
            </li>);
        }

        return <nav {...restProps}>
            <ul refCollection="links"
                style={S.ul}
                className="pagination">
                {links}
            </ul>
        </nav>;
    }

    renderLink(page, active) {
        const handler = () => this.props.onPageSelect(page);
        const ref = 'page' + page;
        const cName = classnames({ active });

        return <li key={page} className={cName}>
            <a ref={ref} onClick={handler}>{page}</a>
        </li>;
    }
}
