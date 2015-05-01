/**
 * TargetAndroidForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { fromJS } from 'immutable';

import { Input } from 'react-bootstrap';
import Upload from './upload';

export default class TargetAndroidForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onNameChange(e) {
        const name = e.target.value;

        this.props.onChange(
            this.props.target.setIn(['android', 'name'], name)
        );
    }

    onFileAdded(file) {
        this.props.onChange(
            this.props.target.setIn(['android', 'file'], fromJS(file))
        );
    }

    //region render
    render() {
        const { target } = this.props;
        const name = target.getIn(['android', 'name']);

        return <div>
            <Input
                value={name}
                onChange={e => this.onNameChange(e)}
                type="text"
                label={iget('Target name')}/>

            <Upload onFileAdded={f => this.onFileAdded(f)}>
                <h2 className="text-center">
                    {iget('Drop files here (last one will be used)')}
                </h2>
            </Upload>
        </div>;
    }

    //endregion
}

TargetAndroidForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    target: Model
};
