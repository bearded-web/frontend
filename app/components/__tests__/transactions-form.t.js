'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { fromJS } from 'immutable';
import { last } from 'lodash';

import TransactionForm from '../transaction-form';

describe('TransactionsForm', function() {
    const transactions = fromJS([
        {
            method: 'GET',
            params: [],
            url: ''
        }
    ]);

    let Component = null;
    let instance = null;
    let onChange = null;

    beforeEach(function() {
        onChange = spy();

        mockery.registerAllowable('../transactions-form', true);
        Component = require('../transactions-form');

        instance = TestUtils.renderIntoDocument(
            <Component onChange={onChange} transactions={transactions}/>
        );
    });

    describe('render', function() {
        it('should render one transaction', () => {
            byType(instance, TransactionForm).should.have.length(1);
        });
    });

    describe('onAddTransaction', () => {
        it('should call onChange with list + new transaction', () => {
            const button = last(nodeByTag(instance, 'button'));

            Simulate.click(button);

            onChange.firstCall.args[0].size.should.be.eql(transactions.size + 1);
        });
    });
});
