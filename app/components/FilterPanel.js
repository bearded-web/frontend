/**
 * FilterPanel
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import autobind from '../lib/autobind';
import { create as createStyle } from 'react-style';

import { Input } from 'react-bootstrap';

const S = createStyle({
    all: {
        float: 'right',
        position: 'relative',
        zIndex: 2
    }
});

export default class FilterPanel extends Component {
    static propTypes = {
        values: PropTypes.object,
        labels: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ])),
        onChange: PropTypes.func.isRequired,
        style: PropTypes.object
    };
    static defaultProps = {
        values: {},
        labels: {}
    };

    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    onCheckAllClick(e) {
        e.preventDefault();

        const { values, onChange } = this.props;
        const reducer = (v, name) => {
            v[name] = true;
            return v;
        };

        onChange(Object.keys(values).reduce(reducer, {}));
    }

    onChange(name) {
        const { values, onChange } = this.props;

        onChange({ [name]: !values[name] });
    }

    render() {
        const { values, labels, style } = this.props;
        const render = v => this.renderCheckbox(v, values[v], labels[v]);

        return <div style={style}>
            <a onClick={this.onCheckAllClick}
               style={S.all}
               href="#"
               ref="checkAll">
                {iget('Check all')}
            </a>

            <div refCollection="controls">
                {Object.keys(values).map(render)}
            </div>
        </div>;
    }

    renderCheckbox(name, value, label) {
        return <Input
            checked={value}
            onChange={e => this.onChange(name, e)}
            label={label}
            key={name}
            ref={'cbx' + name}
            type="checkbox"/>;
    }
}

