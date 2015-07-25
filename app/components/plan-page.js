import { PropTypes, addons, Component } from 'react/addons';
import { startPlanEdit } from '../actions/plan.actions';
import { bindAll } from 'lodash';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import flux from '../flux';
import { fetch as fetchPlugins } from '../actions/plugins.actions';

import { Row, Col } from 'react-bootstrap';
import PlanForm from './plan-form';

export default class PlanPage extends Component {
    static willTransitionTo(transition, params) {
        startPlanEdit(params.planId);
        fetchPlugins();
    }

    constructor(props, context) {
        super(props, context);

        bindAll([
            'onStoreChange',
            'getState',
            'setState'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;

        this.router = context.router;
        this.plansStore = flux.store('PlansStore');
        this.pluginsStore = flux.store('PluginsStore');
        this.state = this.getState();
    }

    componentDidMount() {
        this.plansStore.on('change', this.onStoreChange, this);
        this.pluginsStore.on('change', this.onStoreChange, this);
    }

    componentWillUnmount() {
        this.plansStore.removeListener('change', this.onStoreChange);
        this.pluginsStore.removeListener('change', this.onStoreChange);
    }

    onStoreChange() {
        this.setState(this.getState());
    }

    getState() {
        let planId = this.router.getCurrentParams().planId;

        return {
            plan: this.plansStore.getEdit(),
            plugins: this.pluginsStore.getPlugins()
        };
    }

    render() {
        let { plan, plugins } = this.state;

        if (!plan || plugins.size === 0) {
            return <h1>Loading</h1>;
        }

        return <Row>
            <Col xs={12}>
                <PlanForm
                    $plan={plan}
                    $plugins={plugins}/>
            </Col>
        </Row>;

    }
}

PlanPage.propTypes = {};
PlanPage.contextTypes = {
    router: PropTypes.func
};
