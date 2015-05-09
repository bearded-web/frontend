'use strict';

import React, { PropTypes, addons } from 'react/addons';
import { $Model } from '../lib/types';
import { defaults } from 'lodash';
import { remove } from '../actions/plan.actions';

import { Label } from 'react-bootstrap';

let { PureRenderMixin } = addons;

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        $plan: $Model,
        active: PropTypes.bool
    },

    onRemove(e) {
        e.preventDefault();

        remove(this.props.$plan);
    },

    //TODO add icon for type
    render() {
        let { $plan, active } = this.props,
            { name, desc, targetType, workflow } = $plan.toObject();

        if (!workflow) {
            return <span>Loading</span>;//TODO move loading to upper component
        }

        return <div>
            <p>{desc}</p>
            <p>{workflow.toArray().map(this.renderStepLabel)}</p>
            <div className="clearfix"></div>
        </div>;
    },

    renderStepLabel($step, i) {
        let name = $step.get('name'),
            style = { float: 'left', margin: '0 4px 4px 0' };

        return <Label key={i} style={style}>{name}</Label>;
    }
});

