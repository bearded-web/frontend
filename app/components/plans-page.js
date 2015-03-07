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

    render() {
        let { $plans, $edit, $plugins, $steps } = this.state,
            selectedId = $edit && $edit.get('id');

        return <div>
            <Header>
                <Col xs={12}>
                    <h2>
                        {iget('Plans')}
                    </h2>
                </Col>
            </Header>
            <br/>
            <br/>

            <Row>
                <Col xs={12} md={4}>
                    <Ibox><IboxContent noPadding>
                        <PlansList
                            selectedId={selectedId}
                            $plans={$plans}
                            onSelect={this.onPlanSelect}/>
                    </IboxContent></Ibox>
                </Col>

                <Col xs={12} md={8}>
                    <Ibox><IboxContent>
                        {$edit ?
                            this.renderForm() :
                            this.renderEmptyMessage()
                        }
                    </IboxContent></Ibox>
                </Col>
            </Row>
        </div>
    },

    renderForm() {
        let { $edit, $plugins } = this.state;

        return <PlanForm
            $plan={$edit}
            $plugins={$plugins}/>
    },

    renderEmptyMessage() {
        return <h3 className="text-center">{iget('Select plan in list')}</h3>
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
