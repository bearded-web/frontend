'use strict';

import { PropTypes, Component } from 'react/addons';
import ImMixin from 'react-immutable-render-mixin';
import { $Models } from '../lib/types';
import { chunk, bindAll } from 'lodash';

import Tiles from './tiles';
import Ibox, { IboxTitle, IboxContent } from './ibox';
import { Row, Col, Input, Button, ButtonToolbar } from 'react-bootstrap';
import Fa from './fa';
import PlanItemView from './plan-item-view';
import { Link } from 'react-router';
import PlanRemoveLink from './plan-remove-link';

export default class Plans extends Component {
    constructor() {
        super();

        bindAll(this, [
            'renderPlan',
            'isPlanMatch',
            'renderToolbar'
        ]);
    }

    onStartScan($plan) {
        if (this.props.onStartScan) {
            this.props.onStartScan($plan);
        }
    }

    render() {
        let { $plans, search } = this.props;

        if (search) {
            $plans = $plans.filter($p => this.isPlanMatch(search, $p));
        }
        //TODO if plans not fount add message "Not found, change search settings"
        //If no plans add message, "No plans, create new (link)"
        return <Tiles>
            {$plans.toArray().map(this.renderPlan)}
        </Tiles>;
    }

    renderPlan($plan) {
        let { name, id } = $plan.toObject(),
            editParams = { planId: id };

        return <Ibox key={id}>
            <IboxTitle noControls>
                <PlanRemoveLink className="pull-right" plan={$plan}/>
                <Link to="plan" params={editParams}>
                    <h5>{name}</h5>
                </Link>
            </IboxTitle>
            <IboxContent>
                <PlanItemView $plan={$plan}/>
                <br/>
                {this.renderToolbar($plan)}
            </IboxContent>
        </Ibox>;
    }

    renderToolbar($plan) {
        let scanHandler = this.onStartScan.bind(this, $plan),
            withStartScanButton = !!this.props.onStartScan;

        return <ButtonToolbar className="pull-right">

            {withStartScanButton && <Button bsStyle="primary"
                                            onClick={scanHandler}
                                            bsSize="xsmall">
                {iget('Start scan')}
            </Button>}
        </ButtonToolbar>;
    }

    isPlanMatch(search, $p) {
        let { name, desc } = $p.toObject();

        search = search.toLowerCase();

        name = name.toLowerCase();
        desc = desc ? desc.toLowerCase() : '';

        return name.indexOf(search) > -1 || desc.indexOf(search) > -1;
    }
}

Plans.mixins = [ImMixin];
Plans.propTypes = {
    $plans: $Models,
    search: PropTypes.string,
    onStartScan: PropTypes.func
};

