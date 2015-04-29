'use strict';

import React, { PropTypes, addons } from 'react/addons';
import { $Model } from '../lib/types';
import { defaults } from 'lodash';
import { remove } from '../actions/plan.actions';
import classSet from 'classnames';

import { Label } from 'react-bootstrap';
import RemoveLink from './remove-link';

let { PureRenderMixin } = addons;

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        $plan: $Model,
        active: PropTypes.bool,
        onSelect: PropTypes.func.isRequired
    },

    onRemove(e) {
        e.preventDefault();

        remove(this.props.$plan);
    },

    //TODO add icon for type
    render() {
        let { $plan, active, onSelect } = this.props,
            { name, desc, targetType, workflow } = $plan.toObject(),
            style = { cursor: 'pointer' },
            cName = classSet({
                'list-group-item': true,
                active: active
            });


        return <li className={cName} style={style} onClick={onSelect}>
            <h4>
                <RemoveLink onClick={this.onRemove}/>
                {name}
            </h4>
            <p>{desc}</p>
            <p>{workflow.toArray().map(this.renderStepLabel)}</p>
            <div className="clearfix"></div>
        </li>;
    },

    renderStepLabel($step, i) {
        let name = $step.get('name'),
            style = { float: 'left', margin: '0 4px 4px 0' };

        return <Label key={i} style={style}>{name}</Label>;
    }
});

