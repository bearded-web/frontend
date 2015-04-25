/**
 * Vector
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { Map } from 'immutable';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import { listOf, shape } from 'react-immutable-proptypes';

import HttpTransaction from './http-transaction';

const titleStyle = {
    margin: '3rem 0 3rem 0'
};

export default class Vector extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'renderTransaction'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region render
    render() {
        const { url, httpTransactions } = this.props.vector.toObject();

        return <div>
            {iget('Vector url')}: {url}

            {httpTransactions && <h2 style={titleStyle}>Transactions</h2>}
            {httpTransactions && httpTransactions.toArray().map(this.renderTransaction)}
        </div>;
    }

    renderTransaction(transaction, i) {
        return <HttpTransaction transaction={transaction} key={i}/>;
    }
    //endregion
}

Vector.propTypes = {
    vector: shape({
        url: PropTypes.string,
        httpTransactions: listOf(
            PropTypes.instanceOf(Map)
        )
    })
};
