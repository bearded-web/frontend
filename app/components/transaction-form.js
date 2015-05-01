/**
 * TransactionForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import { fromJS, List, Map } from 'immutable';

import { TabPane, TabbedArea, Row, Col, Input } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
import EntityForm from './entity-form';
import Fa from './fa';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTION', 'HEAD'];
const T_REQ = 'request';
const T_RES = 'response';

export default class TransactionForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onTabSelect'
        ]);

        this.state = { tab: T_REQ };

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onFieldChange(field, e) {
        this.props.onChange(this.props.transaction.set(field, e.target.value));
    }

    onParamsChange(tags) {
        this.props.onChange(this.props.transaction.set('params', List(tags)));
    }

    onTabSelect(tab) {
        const { transaction } = this.props;

        if (tab === T_REQ && !transaction.get('request')) {
            this.props.onChange(transaction.set('request', this.buildEntity()));
        }
        if (tab === T_RES && !transaction.get('response')) {
            this.props.onChange(transaction.set('response', this.buildEntity()));
        }

        this.setState({ tab });
    }


    //region render
    render() {
        const { tab } = this.state;
        const { url, method, params } = this.props.transaction.toObject();

        return <Row>
            <Col xs={12} md={6}>
                <Row><Col xs={3}>

                    <Input
                        value={method}
                        onChange={e => this.onFieldChange('method', e)}
                        type="select"
                        label={iget('Method')}>
                        {methods.map(h => <option key={h} value={h}>{h}</option>)}
                    </Input>

                </Col><Col xs={9}>

                    <Input
                        url={url}
                        onChange={e => this.onFieldChange('url', e)}
                        type="text"
                        placeholder={iget('https://example.com')}
                        label={iget('Transaction url (required)')}/>

                </Col></Row>

                <TagsInput
                    value={params.toArray()}
                    onChange={t => this.onParamsChange(t)}
                    placeholder={iget('Add param')}/>
            </Col>
            <Col xs={12} md={6}>

                <TabbedArea activeKey={tab} onSelect={t => this.onTabSelect(t)}>
                    {this.renderRequestTab()}
                    {this.renderResponseTab()}
                </TabbedArea>
            </Col>
        </Row>;
    }

    renderRequestTab() {
        const entity = this.props.transaction.get('request');

        const title = entity ?
            <span>{iget('Request')}</span> :
            <span><Fa icon="plus"/>{iget('Add request')}</span>;

        const onChange = this.changeField.bind(this, 'request');

        return this.renderEntityTab(
            entity,
            T_REQ,
            title,
            onChange
        );
    }

    renderResponseTab() {
        const entity = this.props.transaction.get('response');
        const title = entity ?
            <span>{iget('Response')}</span> :
            <span><Fa icon="plus"/>{iget('Add response')}</span>;

        const onChange = this.changeField.bind(this, 'response');

        return this.renderEntityTab(
            entity,
            T_RES,
            title,
            onChange
        );
    }


    renderEntityTab(entity, eKey, title, onChange) {
        return <TabPane eventKey={eKey} tab={title}>
            <br/>
            {entity && <EntityForm entity={entity} onChange={onChange}/>}
        </TabPane>;
    }

    //endregion

    buildEntity() {
        return fromJS({
            status: '',
            header: {}
        });
    }

    changeField(field, value) {
        this.props.onChange(this.props.transaction.set(field, value));
    }
}

TransactionForm.propTypes = {
    transaction: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired
};
