/**
 * VulnsSelect render select with vulnerability preview
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Map } from 'immutable';

export default class VulnsSelect extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onChange(e) {
        const id = parseInt(e.target.value, 10);

        this.props.onChange(this.props.vulns.get(id));
    }

    //region render
    render() {
        const { vulns, value } = this.props;

        return <select onChange={e => this.onChange(e)}
                       value={value}
                       className="form-control">
            <option value="0">{iget('Select type')}</option>
            {vulns.toArray().map(this.renderVuln)}
        </select>;
    }

    renderVuln(vuln) {
        const { id, title, severity } = vuln.toObject();

        return <option value={id} key={id}>
            {title} ({severity})
        </option>;
    }

    //endregion
}

VulnsSelect.propTypes = {
    vulns: PropTypes.instanceOf(Map),
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
};
VulnsSelect.defaultProps = {
    value: 0,
    vulns: Map()
};
