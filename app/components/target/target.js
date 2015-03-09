'use strict';

var React = require('react'),
    Router = require('react-router'),
    flux = require('../../flux');

import Ibox, { IboxContent, IboxTitle } from '../ibox';
import TargetComments from '../target-comments';
import Techs from '../fake-techs-small';
import Specialists from '../specialists';
import { Button } from 'react-bootstrap';


var { Row, Col } = require('react-bootstrap'),
    TargetHeader = require('../target-header'),
    Feed = require('../feed'),
    Fa = require('../fa'),
    StartScanButton = require('../start-scan-button'),
    TargetScan = require('../target-scan'),
    TargetStatus = require('../target-status'),
    Widget = require('../widget');

var Target = React.createClass({
    mixins: [
        Router.Navigation,
        FluxMixin,
        createStoreWatchMixin('TargetStore')
    ],

    statics: {
        willTransitionTo: function(transition, params, query) {
            flux.actions.target.setCurrentTarget(params.targetId);
        },
        willTransitionFrom: function() {
            flux.actions.target.unsetCurrentTarget();
        }
    },

    getStateFromFlux: function() {
        return flux.store('TargetStore').getState();
    },

    addFakePentesters() {
        flux.actions.app.addFakePentesters();
    },

    render: function() {
        var { target, loading, showTechs, showIssues } = this.state;

        if (loading || !target) {
            return (
                <Row>
                    <Col xs={12}>
                        <h1 className="text-center">
                        {loading ? ('Loading') : iget('No target Found')}
                        </h1>
                    </Col>
                </Row>
            );
        }


        return (
            <div className="c-target">
                <TargetHeader target={target}/>
                <br/>
                <Row>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col md={6}>
                                <TargetStatus 
                                    high={showIssues ? 1 : 0}
                                    medium={showIssues ? 3 : 0}
                                    low={showIssues ? 0 : 0}
                                    />
                                {this.renderStartScanButton()}
                            </Col>
                            {showTechs && <Col md={6}>
                                <Ibox>
                                    <IboxTitle>
                                        <h5>{iget('Technologies')}</h5>
                                    </IboxTitle>
                                    <IboxContent>
                                        <Techs />
                                    </IboxContent>
                                </Ibox>
                            </Col>}
                        </Row>
                        {this.state.showPs && <Ibox>
                            <IboxTitle>
                                {iget('Specialists')}
                                <Button onClick={this.addFakePentesters} className="pull-right" bsStyle="success" bsSize="xsmall">
                                    Append to project
                                </Button>
                            </IboxTitle>
                            <IboxContent>
                                <Specialists />
                            </IboxContent>
                        </Ibox>}
                        <Ibox>
                            <IboxTitle><h5>{iget('Comments')}</h5></IboxTitle>
                            <IboxContent >
                                <TargetComments target={target}/>
                            </IboxContent>
                        </Ibox>
                    </Col>
                    <Col xs={12} md={6}>
                        <Ibox>
                            <IboxTitle>
                                <h5>{iget('Target timeline')}</h5>
                            </IboxTitle>
                            <IboxContent>
                                <Feed source={target} type="target"/>
                            </IboxContent>
                        </Ibox>
                    </Col>
                </Row>

            </div>
        );
    },

    renderStartScanButton: function() {
        var { target, detectPlan } = this.state,
            targetId = target.id,
            projectId = target.project,
            planId = detectPlan.id;

        return (
            <Row>
                <Col xs={12}>
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
        );
    }
});

module.exports = Target;

if (module.hot) {
    module.hot.accept([
        '../target-status',
        '../target-comments'
    ], function() {
        //TODO flux add actions
    });
}
