'use strict';

import { PropTypes, createClass } from 'react/addons';
import ImMixin from 'react-immutable-render-mixin';
import { $Model, $Models } from '../lib/types';

import { Alert } from 'react-bootstrap';

export default createClass({
    mixins: [ImMixin],

    propTypes: {
        $plugins: $Models,
        selectedName: PropTypes.string,
        onSelect: PropTypes.func.isRequired
    },

    getValue() {
        return this.refs.sel.getDOMNode().value;
    },

    onChange() {
        let selectedName = this.getValue();

        if (this.props.onSelect) {
            this.props.onSelect(selectedName);
        }
    },

    render() {
        let { $plugins, style, selectedName } = this.props;

        return <select className="form-control"
                       stlye={style}
                       ref="sel"
                       value={selectedName}
                       onChange={this.onChange}>
            <option value={''}>select plugin</option>
            {$plugins.toArray().map(this.renderPlugin)}
        </select>;
    },

    renderPlugin($plugin) {
        let name = $plugin.get('name'),
            version = $plugin.get('version'),
            value = name + ':' + version;

        return <option value={value} key={name}>
            {name}
        </option>;
    }
});

