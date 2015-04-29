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

const S = {
    error: { marginLeft: '1rem' }
};

export default class IssueCreateForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onSubmit',
            'onFormChange',
            'addVector'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onSubmit();
    }

    onFieldChange(e, field) {
        this.props.onChange(this.props.issue.set(field, e.target.value));
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

    //region render
    render() {
        const { loading, issue, error } = this.props;
        const { summary, desc, vector, vulnType } = issue.toObject();

        return <div>
            <TabbedArea defaultActiveKey={1}>
                <TabPane eventKey={1} tab={iget('Description')}>
                    <br/>
                    <Row>
                        <Col xs={12} md={6}>
                            <VulnsSelect onChange={e => this.onFieldChange(e, 'vulnType')}
                                         value={vulnType}/>
                            <Input type="text"
                                   onChange={e => this.onFieldChange(e, 'summary')}
                                   value={summary}
                                   disabled={loading}
                                   label={iget('Summary')}
                                   placeholder={iget('Summary')}/>
                            <Input type="textarea"
                                   onChange={e => this.onFieldChange(e, 'desc')}
                                   disabled={loading}
                                   value={desc}
                                   label={iget('Description')}
                                   placeholder={iget('Description')}/>
                        </Col>
                    </Row>


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
