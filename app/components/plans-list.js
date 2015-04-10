"use strict";

import { PropTypes, addons, createClass } from 'react/addons';
import ImMixin from 'react-immutable-render-mixin';
import { $Models } from '../lib/types';
import { addNew } from '../actions/plan.actions';

import PlanListItem from './plans-list-item';
import { Button } from 'react-bootstrap';

export default createClass({
    mixins: [ImMixin],
    displayName: 'PlanList',

    propTypes: {
        $plans: $Models,
        onSelect: PropTypes.func.isRequired,
        selectedId: PropTypes.string
    },

    render() {
        let plans = this.props.$plans.toArray();

        return <ul className="list-group">
            {plans.map(this.renderPlan)}
            {this.renderAdd()}
        </ul>;
    },

    onAddNew() {
        addNew();
    },

    renderPlan($plan) {
        let key = $plan.get('id'),
            active = key === this.props.selectedId,
            handler = () => this.props.onSelect($plan);

        return <PlanListItem
            active={active}
            key={key}
            $plan={$plan}
            onSelect={handler}/>;
    },

    renderAdd() {
        return <li className="list-group-item">
            <Button  bsStyle="primary"  block onClick={this.onAddNew}>
                {iget('Add new plan')}
            </Button>
        </li>;
    }
});

