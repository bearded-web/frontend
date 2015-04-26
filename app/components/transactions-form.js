/**
 * TransactionsForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { List, fromJS } from 'immutable';
import { bindAll } from 'lodash';
import StyleSheet from 'react-style';
import { gray } from '../style';

import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import TransactionForm from './transaction-form';
import Fa from './fa';

const S = StyleSheet.create({
    row: {
        position: 'relative',
        paddingRight: '50px',
        borderBottom: `1px solid ${gray}`,
        marginBottom: '1.5rem',
        paddingBottom: '1rem'
    },
    remove: {
        position: 'absolute',
        right: '10px',
        lineHeight: 0
    }
});

export default class TransactionsForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onAddTransaction',
            'renderTransaction',
            'renderRemoveButton'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onAddTransaction() {
        const newTransaction = fromJS({
            method: 'GET',
            params: [],
            url: ''
        });

        this.props.onChange(this.props.transactions.push(newTransaction));
    }

    onRemoveClick(index) {
        this.props.onChange(this.props.transactions.delete(index));
    }

    //region render
    render() {
        const { transactions } = this.props;

        return <div>
            {transactions.toArray().map(this.renderTransaction)}
            <Button
                onClick={this.onAddTransaction}
                bsStyle="success">
                {iget('Add transaction')}
            </Button>
        </div>;
    }

    renderTransaction(transaction, i) {
        const onChange = t => {
            this.props.onChange(this.props.transactions.set(i, t));
        };

        return <div key={i} style={S.row}>
            {this.renderRemoveButton(i)}
            <TransactionForm
                onChange={onChange}
                transaction={transaction}/>
        </div>;
    }

    renderRemoveButton(index) {
        const tooltip = <Tooltip>{iget('Remove transaction')}</Tooltip>;

        return <OverlayTrigger
            placement='left'
            overlay={tooltip}>
            <button
                onClick={() => this.onRemoveClick(index)}
                style={S.remove}
                className="btn btn-success btn-circle">
                <Fa icon="close"/>
            </button>
        </OverlayTrigger>;
    }

    //endregion
}

TransactionsForm.propTypes = {
    transactions: PropTypes.instanceOf(List),
    onChange: PropTypes.func.isRequired
};
TransactionsForm.defaultProps = {
    transactions: List()
};
