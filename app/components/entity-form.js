/**
 * EntityForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Map } from 'immutable';
import bind from '../lib/bind-react';

import { Input, Button } from 'react-bootstrap';
import HeadersForm from './headers-form';

export default class EntityForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onStatusChange(e) {
        this.props.onChange(this.props.entity.set('status', e.target.value));
    }

    @bind
    onHeadersChange(header) {
        this.props.onChange(this.props.entity.set('header', header));
    }

    @bind
    onBodyChange(e) {
        const content = e.target.value;

        if (!content) {
            this.props.onChange(this.props.entity.delete('body'));

            return;
        }

        let body = this.props.entity.get('body');

        if (!body) {
            body = Map({ contentEncoding: 'text' });
        }

        body = body.set('content', content);

        this.props.onChange(this.props.entity.set('body', body));
    }

    //region render
    render() {
        const { status, header, body } = this.props.entity.toObject();

        const content = body && body.get('content') || '';

        return <div>
            <h4>{iget('Status (required)')}</h4>
            <Input
                value={status}
                onChange={e => this.onStatusChange(e)}
                placeholder={iget('HTTP OK 200')}
                type="text"/>

            <h4>{iget('Headers')}</h4>
            {header && this.renderHeadersForm(header)}
            <h4>{iget('Body')}</h4>
            <Input
                value={content}
                onChange={this.onBodyChange}
                type="textarea"/>
        </div>;
    }

    renderHeadersForm(headers) {
        return <HeadersForm
            headers={headers}
            onChange={this.onHeadersChange}/>;
    }

    //endregion
}

EntityForm.propTypes = {
    entity: PropTypes.instanceOf(Map),
    onChange: PropTypes.func.isRequired
};
