import { FluxMixin } from 'fluxxor';
import React, { addons } from 'react/addons';
import { Navigation } from 'react-router';
import { fetchPlans, selectPlans } from '../actions/plan.actions';
import { fetch as fetchPlugins } from '../actions/plugins.actions';
import flux from '../flux';
import { defaults } from 'lodash';
import setTitle from '../lib/set-title';
import authStore from '../stores/auth.store';


import { Col } from 'react-bootstrap';
import Header from './header';
import Plans from './plans-with-search';

function prefetch() {
    fetchPlans();
    fetchPlugins();
}

export default React.createClass({
    mixins: [
        FluxMixin(React),
        addons.PureRenderMixin,
        Navigation,
        createStoreWatchMixin('PlansStore', 'PluginsStore', 'WorkflowStore')
    ],

    statics: {
        willTransitionTo: function() {
            prefetch();
        }
    },

    getInitialState() {
        return this.getState();
    },

    componentDidMount() {
        setTitle(iget('Plans'));

        authStore.onChange(this.onStoreChange);
    },

    onPlanSelect($plan) {
        selectPlans($plan);
    },

    componentWillUnmount() {
        authStore.offChange(this.onStoreChange);
    },

    onStoreChange() {
        this.setState(this.getState);
    },

    getState() {
        return {
            canAdd: authStore.isAdmin()
        };
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
        const { $plans, canAdd } = this.state;

        return <div>
            <Header>
                <Col xs={12}>
                    <h2>
                        {canAdd && <a onClick={this.addNewPlan} className="pull-right">Create new plan</a>}

                        {iget('Plans')}
                    </h2>
                </Col>
            </Header>

            <Plans plans={$plans}/>
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
