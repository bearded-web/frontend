/**
 * TransactionForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { List } from 'immutable';

import { Row, Col, Input } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTION', 'HEAD'];

export default class TransactionForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onFieldChange(field, e) {
        this.props.onChange(this.props.transaction.set(field, e.target.value));
    }

    onParamsChange(tags) {
        this.props.onChange(this.props.transaction.set('params', List(tags)));
    }

    //region render
    render() {
        const { url, method, params } = this.props.transaction.toObject();

        return <Row>
            <Col xs={12} md={6}>
                <Row><Col xs={3}>

                    <Input
                        value={method}
                        onChange={e => this.onFieldChange('method', e)}
                        type="select"
                        label={iget('Method')}>
                        {methods.map(h => <option value={h}>{h}</option>)}
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
        </Row>;
    }

    //endregion
}

TransactionForm.propTypes = {
    transaction: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired
};
