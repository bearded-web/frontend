/**
 * SortTh
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { create as createStyle } from 'react-style';

import Fa from './fa';

const S = createStyle({
    th: { cursor: 'pointer' },
    icon: { marginLeft: '0.5rem' }
});

export default class SortTh extends Component {
    static propTypes = {
        field: PropTypes.string.isRequired,
        value: PropTypes.string,
        children: PropTypes.node,
        onChange: PropTypes.func.isRequired
    };
    static defaultProps = {
        value: ''
    };
    shouldComponentUpdate = shouldComponentUpdate;

    onClick() {
        const { field, value } = this.props;

        this.props.onChange(field === value ? '-' + field : field);
    }

    render() {
        const { children, field, value } = this.props;

        let icon = 'sort';

        if (value === field) icon = 'sort-asc';
        if (value === '-' + field) icon = 'sort-desc';

        return <th style={S.th} onClick={() => this.onClick()}>
            {children}
            <Fa icon={icon} style={S.icon} align="initial"/>
        </th>;
    }
}

