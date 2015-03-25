'use strict';

import React from 'react/addons';
import {fromJS} from 'immutable';

import Ibox, { IboxContent } from '../ibox';
import PlanItemView from '../plan-item-view';


var flux = require('../../flux'),
    Router = require('react-router'),
    _ = require('lodash');



var { Row, Col, Input } = require('react-bootstrap'),
    StartScanButton = require('../start-scan-button');

var Scan = React.createClass({
    mixins: [
        Router.State,
        FluxMixin,
        createStoreWatchMixin('ScanStore')
    ],

    getStateFromFlux: function() {
        return flux.store('ScanStore').getState();
    },

    onPlanChange: function(event) {
        flux.actions.scan.setSelectedPlan(event.target.value);
    },

    render: function() {
        var { selectedPlan } = this.state,
            targetId = this.getParams().targetId,
            projectId = this.getQuery().project,
            planId = selectedPlan.id;

        return (
            <div className="c-scan">
                <br/>
                <br/>
                <Row>
                    <Col sm={8} md={6}>
                        {this.renderForm()}
                        <PlanItemView $plan={fromJS(selectedPlan)}/>
                    </Col>
                    <Col sm={4} md={6}>
                        <Ibox>
                            <IboxContent>
                                <StartScanButton
                                    project={projectId}
                                    target={targetId}
                                    plan={planId} />
                            </IboxContent>
                        </Ibox>
                    </Col>
                </Row>
            </div>
        );
    },

    renderForm: function() {
        var { selectedPlan, plans } = this.state;

        if (!plans.length) {
            return (
                <div>{iget('Loading...')}</div>
            );
        }

        return (
            <form>
                <Input type="select" defaultValue={selectedPlan.id} onChange={this.onPlanChange} label={iget('Select plan')}>
                    {this.state.plans.map(function(plan) {
                        return (
                            <option key={plan.id} value={plan.id}>
                                {plan.name}
                            </option>
                        );
                    })}
                </Input>
            </form>
        );
    }
});

module.exports = Scan;
