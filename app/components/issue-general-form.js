/**
 * IssueGeneralForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { bindAll } from 'lodash';

import { Input } from 'react-bootstrap';
import VulnsSelect from './vulns-select-container';
import SeveritySelect from './severity-select';

export default class IssueGeneralForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onFieldChange',
            'onVulnChange'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onFieldChange({ target, value }, field) {
        this.props.onChange(this.props.issue.set(field, value || target.value));
    }

    onVulnChange(vuln) {
        this.props.onChange(this.props.issue.merge({
            vulnType: vuln.get('id'),
            severity: vuln.get('severity')
        }));
    }

    //region render
    render() {
        const { issue, loading } = this.props;
        const { summary, desc, vulnType, severity } = issue.toObject();

        return <div>
            <VulnsSelect
                onChange={this.onVulnChange}
                value={vulnType}/>
            <br/>

            <label>{iget('Severity')}</label>
            <SeveritySelect
                onChange={e => this.onFieldChange(e, 'severity')}
                value={severity}/>

            <br/>

            <Input
                type="text"
                onChange={e => this.onFieldChange(e, 'summary')}
                value={summary}
                disabled={loading}
                label={iget('Summary (required)')}
                placeholder={iget('Summary')}/>
            <Input
                type="textarea"
                onChange={e => this.onFieldChange(e, 'desc')}
                disabled={loading}
                value={desc}
                label={iget('Description')}
                placeholder={iget('Description')}/>
        </div>;
    }

    //endregion
}

IssueGeneralForm.propTypes = {
    issue: Model,
    loading: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};
IssueGeneralForm.defaultProps = {
    loading: false
};
