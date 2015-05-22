/**
 * IssueStatusFilterSelect
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import autobind from '../lib/autobind';

import { Input } from 'react-bootstrap';

export default class IssueStatusFilterSelect extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    onChange() {
        const value = this.refs.input.getValue();

        this.props.onChange({ null: null, true: true, false: false }[value]);
    }

    render() {
        return <Input
            ref="input"
            type="select"
            className="input-sm"
            {...this.props}
            onChange={this.onChange}>
            <option value={null}></option>
            <option value={true}>{iget('Yes')}</option>
            <option value={false}>{iget('No')}</option>
        </Input>;
    }
}

