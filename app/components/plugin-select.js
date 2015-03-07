"use strict";

import { PropTypes, createClass } from 'react/addons';
import ImMixin from 'react-immutable-render-mixin';
import { $Model, $Models } from '../lib/types';

export default createClass({
    mixins: [ImMixin],

    propTypes: {
        selectedName: PropTypes.string,
        $plugins: $Models,
        onSelect: PropTypes.func.isRequired
    },

    onChange() {
        this.props.onSelect(this.refs.sel.getDOMNode().value);
    },

    render() {
        let { $plugins, selectedName } = this.props;

        return <select className="form-control"
                       ref="sel"
                       value={selectedName}
                       onChange={this.onChange}>

            {$plugins.toArray().map(this.renderPlugin)}
        </select>
    },

    renderPlugin($plugin) {
        let name = $plugin.get('name'),
            version = $plugin.get('version'),
            value = name + ':' + version;

        return <option value={value} key={name}>
            {name}
        </option>
    }
});

