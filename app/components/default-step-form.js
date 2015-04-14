/**
 * Form for plan step. Use plugin.formSchema to render form.
 * If schema not provided – return empty span.
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { bindAll } from 'lodash';
import t from 'tcomb-form';
import toType from 'tcomb-json-schema';
import { Map } from 'immutable';

const { Form } = t.form;

export default class DefaultStepForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onChange',
            '_getSchema',
            '_getValues'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onChange(values) {
        const data = JSON.stringify(values);

        this.props.onChange(this.props.step.setIn(['conf', 'formData'], data));
    }

    _getSchema() {
        const { plugin } = this.props;
        const schema = plugin.get('formSchema');

        if (!schema) return null;

        try {
            return JSON.parse(schema);
        }
        catch (e) {
            console.error(
                'Invalid schema in plugin %s',
                plugin.get('name')
            );

            return null;
        }
    }

    _getValues() {
        const { step, plugin } = this.props;

        try {
            return JSON.parse(step.getIn(['conf', 'formData']));
        }
        catch (e) {
            console.error(
                'Invalid formData in step for plugin %s',
                plugin.get('name')
            );

            return {};
        }
    }

    render() {
        const schema = this._getSchema();

        if (!schema) return <span></span>;

        const values = this._getValues();
        const type = toType(schema);

        return <Form type={type} value={values} onChange={this.onChange}/>;
    }
}

DefaultStepForm.propTypes = {
    step: PropTypes.instanceOf(Map).isRequired,
    plugin: Model,
    onChange: PropTypes.func.isRequired
};

