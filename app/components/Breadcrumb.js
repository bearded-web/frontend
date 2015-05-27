/**
 * Breadcrumb
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { create } from 'react-style';

const S = create({
    breadcrumb: {
        background: 'none',
        margin: '1rem 0 1.5rem'
    }
});

export default class Breadcrumb extends Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.node)
    };
    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { children } = this.props;

        return <ol className="breadcrumb" style={S.breadcrumb}>
            {children.map((c, i) => <li key={i}>{c}</li>)}
        </ol>;
    }
}

