/**
 * VulnsSelect render select with vulnerability preview
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { List } from 'immutable';

export default class VulnsSelect extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region render
    render() {
        const { vulns, value, onChange } = this.props;

        return <select onChange={onChange}
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
    vulns: PropTypes.instanceOf(List),
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
};
VulnsSelect.defaultProps = {
    value: 0,
    vulns: List()
};
