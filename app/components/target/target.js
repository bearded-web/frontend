'use strict';

var React = require('react'),
    flux = require('../../flux');

import Router, { Link } from 'react-router';
import Ibox, { IboxContent, IboxTitle } from '../ibox';
import TargetComments from '../target-comments';
import { Button } from 'react-bootstrap';
import setTitle from '../../lib/set-title';
import SeverityWidget from '../severity-widget';


var { Row, Col } = require('react-bootstrap'),
    TargetHeader = require('../target-header'),
    Feed = require('../feed'),
    Fa = require('../fa'),
    StartScanButton = require('../start-scan-button'),
    TargetScan = require('../target-scan'),
    TargetStatus = require('../target-status');

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

    componentDidMount() {
        const { target, loading } = this.state;

        let title = iget('Target');

        if (!loading && target) {
            title = target.web.domain;
        }

        setTitle(title);
    },

    getStateFromFlux() {
        return flux.store('TargetStore').getState();
    },

    onTotalsClick() {
        const target = this.state.target.id;

        this.context.router.transitionTo('issues', {}, { target });
    },

    render: function() {
        var { target, loading } = this.state;

        if (loading || !target) {
            return <div className="c-target">
                <Row>
                    <Col xs={12}>
                        <h1 className="text-center">
                            {loading ? ('Loading') : iget('No target Found')}
                        </h1>
                    </Col>
                </Row>
            </div>;
        }

        let issues = target.summaryReport && target.summaryReport.issues;
        issues = issues || {};

        return (
            <div className="c-target">
                <TargetHeader target={target}/>
                <br/>
                <Row>
                    <Col xs={12} md={6}>
                        <Row style={{marginTop: '-10px'}}>
                            <Link to="issues" query={{target: target.id}}>
                                <Col xs={12} sm={4}><SeverityWidget severity="high" count={issues.high}/></Col>
                                <Col xs={12} sm={4}><SeverityWidget severity="medium" count={issues.medium}/></Col>
                                <Col xs={12} sm={4}><SeverityWidget severity="low" count={issues.low}/></Col>
                            </Link>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Ibox><IboxTitle>
                                    <h5>{iget('Actions')}</h5>
                                </IboxTitle><IboxContent style={{minHeight: '100px'}}>
                                    {this.renderStartScanButton()}
                                </IboxContent></Ibox>
                            </Col>
                        </Row>
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

        return <StartScanButton
            project={projectId}
            target={targetId}
            plan={planId}/>;
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
