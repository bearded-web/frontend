/**
 * HeadersForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { List, fromJS } from 'immutable';
import StyleSheet from 'react-style';
/*eslint-disable no-unused-vars */
import bind from '../lib/autobind';
/*eslint-enable no-unused-vars */

import { Input, Button } from 'react-bootstrap';


const S = StyleSheet.create({
    component: {
        wordWrap: 'break-word'
    },
    header: {
        marginBottom: '0.2rem'
    },
    name: {
        float: 'left',
        marginRight: '0.5rem',
        maxWidth: '100%'
    },
    value: {
        float: 'left',
        maxWidth: '100%'
    }
});

export default class HeadersForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }


    @bind
    onAddClick() {
        const name = this.refs.name.getValue();
        const value = this.refs.value.getValue();

        if (!name || !value) return;

        this.props.onChange(this.props.headers.push(fromJS({
            key: name,
            values: [value]
        })));

        this.refs.name.getInputDOMNode().value = '';
        this.refs.value.getInputDOMNode().value = '';
    }

    onRemoveClick(e, key) {
        e.preventDefault();

        this.props.onChange(this.props.headers.delete(key));
    }

    //region render
    render() {
        const { headers } = this.props;

        return <div style={S.component}>
            {headers.size > 0 && this.renderHeaders(headers)}
            <Input
                ref="name"
                placeholder={iget('Header name')}
                className="input-sm"
                type="text"/>
            <Input
                ref="value"
                placeholder={iget('Header value')}
                className="input-sm"
                type="text"/>

            <Button
                onClick={this.onAddClick}
                bsStyle="primary"
                bsSize="small">
                {iget('Add header')}
            </Button>
        </div>;
    }

    renderHeaders(headers) {
        return <ul className="list-unstyled">
            {headers.toArray().map(this.renderHeader)}
        </ul>;
    }

    @bind
    renderHeader(header, key) {
        const name = header.get('key');
        let values = header.get('values');

        values = values ? values.toArray() : [];

        const elements = [];
        const onRemove = e => this.onRemoveClick(e, key);

        const l = values.size - 1;
        values.map((v, i) => elements.push(v, i < l ? <br/> : ''));

        return <li key={name} className="clearfix" style={S.header}>
            <div style={S.name}><strong>{name}:</strong></div>
            <div style={S.value}>
                {elements}
                &nbsp;
                (<a onClick={onRemove}>{iget('remove')}</a>)
            </div>
        </li>;
    }

    //endregion render

}

HeadersForm.propTypes = {
    headers: PropTypes.instanceOf(List).isRequired,
    onChange: PropTypes.func.isRequired
};
