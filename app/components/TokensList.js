/**
 * TokensList
 */

import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Models } from '../lib/types';
import { remove } from '../actions/tokensActions';
import { create as createStyle } from 'react-style';
import autobind from '../lib/autobind';
import moment from 'moment';

import { Table, Input, Button } from 'react-bootstrap';

const S = createStyle({
    table: {
        wordBreak: 'break-word'
    },
    code: {
        marginTop: '0.5rem'
    },
    ctrlColumn: {
        textAlign: 'right'
    },
    date: {
        color: '#a7a7a7'
    }
});

export default class TokensList extends Component {
    static propTypes = {
        tokens: Models
    };
    shouldComponentUpdate = shouldComponentUpdate;


    render() {
        const { tokens } = this.props;

        return <Table style={S.table}>
            <tbody>
            {tokens.toArray().map(this.renderToken)}
            </tbody>
        </Table>;
    }

    @autobind
    renderToken(token) {
        const { id, name, value, created } = token.toObject();
        const createdStr = moment(created).format('YYYY.MM.DD HH:mm');

        return <tr key={id}>
            <td>
                <strong>{name}</strong> <span style={S.date}>{createdStr}</span>
                {value ? this.renderValue(value) : ''}
            </td>
            <td style={S.ctrlColumn}>
                <Button
                    onClick={() => remove(id)}
                    title={iget('Delete token')}
                    bsSize="xsmall"
                    bsStyle="warning">
                    {iget('Delete')}
                </Button>
            </td>
        </tr>;
    }

    renderValue(value) {
        const help = iget('Please copy your new personal access token now.') +
            iget('It won\'t be shown again for your security');

        return <Input
            value={value}
            help={help}
            type="text"/>;
    }
}

