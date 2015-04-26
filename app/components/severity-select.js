/**
 * SeveritySelect
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { HIGH, MEDIUM, LOW, INFO } from '../lib/severities';

export default class SeveritySelect extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region render
    render() {
        const { value, onChange } = this.props;

        return <select
            value={value}
            onChange={onChange}
            className="form-control">

            <option value={HIGH}>{iget(HIGH)}</option>
            <option value={MEDIUM}>{iget(MEDIUM)}</option>
            <option value={LOW}>{iget(LOW)}</option>
            <option value={INFO}>{iget(INFO)}</option>
        </select>;
    }

    //endregion
}

SeveritySelect.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
SeveritySelect.defaultProps = {
    value: HIGH
};
