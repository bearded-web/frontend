/**
 * IssuesVulnTypeFilter
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { shape } from 'react-immutable-proptypes';
import { updateFilter } from '../actions/issuesActions';
import autobind from '../lib/autobind';

import VulnsSelect from './VulnsSelect';

export default class IssuesVulnTypeFilter extends Component {
    static propTypes = {
        filter: shape({ summary: PropTypes.string }).isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    onChange(vulnType) {
        const value = vulnType ? vulnType.get('id') : null;
        updateFilter(this.props.filter.set('vulnType', value));
    }

    render() {
        const vulnType = this.props.filter.get('vulnType');

        return <VulnsSelect onChange={this.onChange} value={vulnType}/>;
    }
}

