/**
 * TargetWebForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';

import { Input } from 'react-bootstrap';

export default class TargetWebForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onDomainChange(e) {
        const domain = e.target.value;

        this.props.onChange(
            this.props.target.setIn(['web', 'domain'], domain)
        );
    }

    //region render
    render() {
        const { target } = this.props;
        const domain = target.getIn(['web', 'domain']);

        return <div>
            <Input
                value={domain}
                onChange={e => this.onDomainChange(e)}
                type="text"
                placeholder={iget('http://example.com')}
                label={iget('Target domain')}/>
        </div>;
    }

    //endregion
}

TargetWebForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    target: Model
};
