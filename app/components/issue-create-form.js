/**
 * IssueCreateForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { bindAll } from 'lodash';
import t from 'tcomb-form';
import { fromJS } from 'immutable';

import { Row, Col, Input, Button, TabPane, TabbedArea } from 'react-bootstrap';
import VectorForm from './vector-form';
import VulnsSelect from './vulns-select-container';
import SeveritySelect from './severity-select';
import ReferencesForm from './references-form';

const S = {
    error: { marginLeft: '1rem' }
};

export default class IssueCreateForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onSubmit',
            'onFormChange',
            'addVector',
            'onVulnChange',
            'onRefsChange'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onSubmit();
    }

    onFieldChange({ target, value }, field) {
        this.props.onChange(this.props.issue.set(field, value || target.value));
    }

    onFormChange(value) {
        this.props.onChange(this.props.issue.merge(value));
    }

    addVector() {
        this.props.onChange(this.props.issue.set('vector', fromJS({
            httpTransactions: [{
                url: '',
                method: 'GET'

            }]
        })));
    }

    onVectorChange(vector) {
        this.props.onChange(this.props.issue.set('vector', vector));
    }

    onVulnChange(vuln) {
        this.props.onChange(this.props.issue.merge({
            vulnType: vuln.get('id'),
            severity: vuln.get('severity')
        }));
    }

    onRefsChange(refs) {
        this.props.onChange(this.props.issue.set('references', refs));
    }

    //region render
    render() {
        const { loading, issue, error } = this.props;
        const {
            summary,
            desc,
            vulnType,
            severity,
            references } = issue.toObject();

        return <div>
            <TabbedArea defaultActiveKey={1}>
                <TabPane eventKey={1} tab={iget('Description')}>
                    <br/>
                    <Row> <Col xs={12} md={6}>
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
                    </Col> <Col xs={12} md={6}>
                        <h3 className="text-center">References</h3>
                        <ReferencesForm
                            references={references}
                            onChange={this.onRefsChange}/>
                    </Col></Row>


                </TabPane>
                {/* <TabPane eventKey={2} tab={iget('Vector')}>
                 <br/>
                 {vector || <Button bsStyle="primary" onClick={this.addVector}>
                 {iget('Add vector')}
                 </Button>}
                 {vector && <VectorForm vector={vector} onChange={this.onVectorChange}/>}
                 </TabPane> */}
            </TabbedArea>

            <hr/>
            <Button onClick={this.onSubmit}
                    bsStyle="primary"
                    disabled={loading}
                    bsSize="large">
                {iget('Save new issue')}
            </Button>

            <span className="text-danger" style={S.error}>
                {error}
            </span>
        </div>;
    }

    //endregion
}

IssueCreateForm.propTypes = {
    issue: Model,
    error: PropTypes.string,
    loading: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};
IssueCreateForm.defaultProps = {
    loading: true,
    error: ''
};
