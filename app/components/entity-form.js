/**
 * EntityForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Map } from 'immutable';

import { Input, Button } from 'react-bootstrap';
import HeadersForm from './headers-form';

export default class EntityForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onStatusChange(e) {
        this.props.onChange(this.props.entity.set('status', e.target.velue));
    }

    onHeadersChange(header) {
        this.props.onChange(this.props.entity.set('header', header));
    }

    //region render
    render() {
        const { status, header } = this.props.entity.toObject();

        return <div>
            <Input
                value={status}
                onChange={e => this.onStatusChange(e)}
                label={iget('Status')}
                placeholder={iget('HTTP OK 200')}
                type="text"/>

            <h4>{iget('Headers')}</h4>
            {header || this.renderAddHeadersButton()}
            {header && this.renderHeadersForm(header)}
        </div>;
    }

    renderHeadersForm(headers) {
        return <HeadersForm
            headers={headers}
            onChange={this.onHeadersChange}/>;
    }

    renderAddHeadersButton() {
        return <Button>
            {iget('Add headers info')}
        </Button>;
    }

    //endregion
}

EntityForm.propTypes = {
    entity: PropTypes.instanceOf(Map),
    onChange: PropTypes.func.isRequired
};
