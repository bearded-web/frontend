/**
 * IssueCreateForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { bindAll } from 'lodash';
import { fromJS, Map } from 'immutable';

import { Row, Col, Button, TabPane, TabbedArea } from 'react-bootstrap';
import VectorForm from './vector-form';
import ReferencesForm from './references-form';
import Fa from './fa';
import IssueGeneralForm from './issue-general-form';

const S = {
    error: { marginLeft: '1rem' }
};
const VECTOR = 'vector';
const DESC = 'desc';
const REFS = 'refs';

export default class IssueCreateForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onSubmit',
            'onRefsChange',
            'onVectorChange',
            'renderVectorTab',
            'renderRefsTab',
            'onTabSelect'
        ]);

        this.state = { tab: DESC };

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onSubmit();
    }

    onVectorChange(vector) {
        this.props.onChange(this.props.issue.set('vector', vector));
    }

    onRefsChange(refs) {
        this.props.onChange(this.props.issue.set('references', refs));
    }

    onTabSelect(tab) {
        if (tab === VECTOR && !this.props.issue.get('vector')) {
            this.props.onChange(this.props.issue.set('vector', Map()));
        }
        if (tab === REFS && !this.props.issue.get('references')) {
            const refs = fromJS([{
                title: '',
                url: ''
            }]);

            this.props.onChange(this.props.issue.set('references', refs));
        }

        this.setState({ tab });
    }

    //region render
    render() {
        const { tab } = this.state;
        const { loading, issue, error, onChange } = this.props;
        const { vector, references } = issue.toObject();

        return <div>
            <TabbedArea activeKey={tab} onSelect={this.onTabSelect}>
                <TabPane eventKey={DESC} tab={iget('Description')}>
                    <br/>
                    <Row><Col xs={12} md={6} mdOffset={3}>

                        <IssueGeneralForm
                            issue={issue}
                            onChange={onChange}/>

                    </Col></Row>
                </TabPane>
                {this.renderRefsTab(references)}
                {this.renderVectorTab(vector)}
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

    renderVectorTab(vector) {
        const title = vector ?
            <span>{iget('Vector')}</span> :
            <span><Fa icon="plus"/>{iget('Add vector')}</span>;

        return <TabPane eventKey={VECTOR} tab={title}>
            <br/>
            {vector && <VectorForm vector={vector} onChange={this.onVectorChange}/>}
        </TabPane>;
    }

    renderRefsTab(references) {
        const title = references ?
            <span>{iget('References')}</span> :
            <span><Fa icon="plus"/>{iget('Add references')}</span>;

        return <TabPane eventKey={REFS} tab={title}>
            <Row><Col xs={12} md={6} mdOffset={3}>
                <br/>
                {references && <ReferencesForm
                    references={references}
                    onChange={this.onRefsChange}/>}
            </Col></Row>
        </TabPane>;
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
    loading: false,
    error: ''
};
