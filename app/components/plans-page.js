"use strict";

import React, { PropTypes, addons } from 'react/addons';
import { Navigation } from 'react-router';
import { fetchPlans, selectPlans } from '../actions/plan.actions';
import { fetch as fetchPlugins } from '../actions/plugins.actions';
import flux from '../flux';
import { defaults } from 'lodash';

import { Row, Col } from 'react-bootstrap';
import Ibox, { IboxContent } from './ibox';
import Header from './header';
import Plans from './plans-with-search';
import PlansList from '../components/plans-list';
import PlanForm from '../components/plan-form';

function prefetch() {
    fetchPlans();
    fetchPlugins();
}

export default React.createClass({
    mixins: [
        FluxMixin,
        addons.PureRenderMixin,
        Navigation,
        createStoreWatchMixin('PlansStore', 'PluginsStore', 'WorkflowStore')
    ],

    statics: {
        willTransitionTo: function() {
            prefetch();
        }
    },

    onPlanSelect($plan) {
        selectPlans($plan);
    },

    getStateFromFlux() {
        return defaults({},
            flux.store('PlansStore').getState(),
            flux.store('PluginsStore').getState(),
            flux.store('WorkflowStore').getState()
        );
    },

    addNewPlan() {
        this.context.router.transitionTo('plan', {
            planId: 'new'
        });
    },

    render() {
        let { $plans, $edit, $plugins, $steps } = this.state,
            selectedId = $edit && $edit.get('id');

        return <div>
            <Header>
                <Col xs={12}>
                    <h2>
                        <a onClick={this.addNewPlan} className="pull-right">Create new plan</a>

                        {iget('Plans')}
                    </h2>
                </Col>
            </Header>

            <Plans $plans={$plans}/>
        </div>;
    }
});

if (module.hot) {
    module.hot.accept([
        '../components/plans-list',
        '../components/plan-form',
        './header',
        '../actions/plan.actions',
        './ibox'
    ], function() {
    });
}
