/**
 * IssuesStatusFilter
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import autobind from '../lib/autobind';
import { updateFilter } from '../actions/issuesActions';
import { pairs } from 'lodash';

import IssueStatusFilterSelect from './IssueStatusFilterSelect';

const labels = {
    false: iget('False'),
    muted: iget('Muted'),
    confirmed: iget('Confirmed'),
    resolved: iget('Resolved')
};

export default class IssuesStatusFilter extends Component {
    static propTypes = {
        filter: PropTypes.object
    };
    shouldComponentUpdate = shouldComponentUpdate;

    onChange(name, value) {
        const { filter } = this.props;

        updateFilter(filter.set(name, value));
    }

    render() {
        const { filter } = this.props;

        return <form className="form-horizontal">
            {pairs(labels).map(this.renderSelect)}
        </form>;
    }

    @autobind
    renderSelect([name, label]) {
        return <IssueStatusFilterSelect
            onChange={value => this.onChange(name, value)}
            labelClassName="col-xs-5"
            wrapperClassName="col-xs-7"
            className="input-sm"
            label={label}/>;
    }
}

