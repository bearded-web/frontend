/**
 * VectorForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Map } from 'immutable';

import HeadersForm from './headers-form';
import { Input } from 'react-bootstrap';
import TransactionsForm from './transactions-form';


export default class VectorForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onUrlChange(e) {
        const { value } = e.target;

        this.props.onChange(this.props.vector.set('url', value));
    }

    onTransactionsChange(transactions) {
        this.props.onChange(
            this.props.vector.set('httpTransactions', transactions)
        );
    }

    //region render
    render() {
        const { url, httpTransactions } = this.props.vector.toObject();

        return <div>
            <Input
                value={url}
                onChange={e => this.onUrlChange(e)}
                type="text"
                label={iget('Vector url')}/>

            <h3 className="text-center">
                {iget('Transactions')}
            </h3>

            <TransactionsForm
                onChange={t => this.onTransactionsChange(t)}
                transactions={httpTransactions}/>
        </div>;
    }
    //endregion
}

VectorForm.propTypes = {
    vector: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired
};
