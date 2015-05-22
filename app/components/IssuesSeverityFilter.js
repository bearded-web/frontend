/**
 * IssuesSeverityFilter
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { shape } from 'react-immutable-proptypes';
import autobind from '../lib/autobind';
import { updateFilter } from '../actions/issuesActions';
import { HIGH, MEDIUM, LOW, INFO } from '../lib/severities';
import { capitalize } from 'lodash';

import { Input } from 'react-bootstrap';

const severities = [HIGH, MEDIUM, LOW, INFO];

export default class IssuesSeverityFilter extends Component {
    static propTypes = {
        filter: shape({ severity: PropTypes.string }).isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    onChange() {
        let severity = this.refs.severity.getValue();
        if (severity === 'all') severity = null;
        updateFilter(this.props.filter.set('severity', severity));
    }

    render() {
        const severity = this.props.filter.get('severity');

        return <Input
            type="select"
            ref="severity"
            value={severity}
            onChange={this.onChange}>
            <option value="all">All severities</option>
            {severities.map(this.renderSeverityOption)}
        </Input>;
    }

    renderSeverityOption(severity) {
        return <option value={severity} key={severity}>
            {capitalize(severity)}
        </option>;
    }
}
