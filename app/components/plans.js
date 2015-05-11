/**
 * Plans render plans list according to filter
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Models } from '../lib/types';
import bindReact from '../lib/autobind.js';  // eslint-disable-line no-unused-vars
import connectToStores from '../lib/connectToStores';  // eslint-disable-line no-unused-vars
import authStore from '../stores/auth.store';

import Tiles from './tiles';
import Ibox, { IboxTitle, IboxContent } from './ibox';
import { Button, ButtonToolbar } from 'react-bootstrap';
import PlanItemView from './plan-item-view';
import { Link } from 'react-router';
import PlanRemoveLink from './plan-remove-link';

/**
 * Retrieves state from stores for current props.
 */
function getState() { // eslint-disable-line no-unused-vars
    return {
        canEdit: authStore.isAdmin()
    };
}

@connectToStores([authStore], getState)
export default class Plans extends Component {
    static propTypes = {
        canEdit: PropTypes.bool,
        plans: Models,
        search: PropTypes.string,
        onStartScan: PropTypes.func
    };
    static defaultProps = {
        canEdit: false,
        search: ''
    };

    shouldComponentUpdate = shouldComponentUpdate;

    onStartScan(plan) {
        if (this.props.onStartScan) {
            this.props.onStartScan(plan);
        }
    }

    render() {
        let { plans, search } = this.props;

        if (search) {
            plans = plans.filter($p => this.isPlanMatch(search, $p));
        }
        //TODO if plans not fount add message "Not found, change search settings"
        //If no plans add message, "No plans, create new (link)"
        return <Tiles>
            {plans.toArray().map(this.renderPlan)}
        </Tiles>;
    }

    @bindReact
    renderPlan(plan) {
        const { canEdit } = this.props;
        const { name, id } = plan.toObject();
        const editParams = { planId: id };

        let title = <h5>{name}</h5>;

        if (canEdit) {
            title = <Link to="plan" params={editParams}>
                {title}
            </Link>;
        }

        return <Ibox key={id}>
            <IboxTitle noControls>
                {canEdit && <PlanRemoveLink className="pull-right" plan={plan}/>}
                {title}
            </IboxTitle>
            <IboxContent>
                <PlanItemView $plan={plan}/>
                <br/>
                {this.renderToolbar(plan)}
            </IboxContent>
        </Ibox>;
    }

    @bindReact
    renderToolbar(plan) {
        let scanHandler = this.onStartScan.bind(this, plan),
            withStartScanButton = !!this.props.onStartScan;

        return <ButtonToolbar className="pull-right">

            {withStartScanButton && <Button bsStyle="primary"
                                            onClick={scanHandler}
                                            bsSize="xsmall">
                {iget('Start scan')}
            </Button>}
        </ButtonToolbar>;
    }

    @bindReact
    isPlanMatch(search, plan) {
        let { name, desc } = plan.toObject();

        search = search.toLowerCase();

        name = name.toLowerCase();
        desc = desc ? desc.toLowerCase() : '';

        return name.indexOf(search) > -1 || desc.indexOf(search) > -1;
    }
}


