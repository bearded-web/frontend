/**
 * Pagination
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { NaturalNumber, NaturalNumberWithZero } from '../lib/types';
import { noop } from 'lodash';
import classnames from 'classnames';
import { create as createStyle } from 'react-style';

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
        maxLinks: 5,
        page: 1
    };

    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { count, pageSize, page, maxLinks } = this.props;
        const maxPages = pageSize ? Math.ceil(count / pageSize) : 1;
        const middle = page;

        let first = Math.ceil(middle - maxLinks / 2);
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

        return <nav>
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

//<li>
//                    <a href="#" aria-label="Previous">
//                        <span aria-hidden="true">&laquo;</span>
//                    </a>
//                </li>
//
//                <li><a href="#">1</a></li>
//                <li><a href="#">2</a></li>
//                <li><a href="#">3</a></li>
//                <li><a href="#">4</a></li>
//                <li><a href="#">5</a></li>
//                <li>
//                    <a href="#" aria-label="Next">
//                        <span aria-hidden="true">&raquo;</span>
//                    </a>
//                </li>
