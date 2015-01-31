var React = require('react'),
    Router = require('react-router'),
    flux = require('../../flux');

var { Row, Col } = require('react-bootstrap'),
    TargetHeader = require('../target-header'),
    Feed = require('../feed'),
    Fa = require('../fa'),
    Ibox = require('../ibox'),
    IboxTitle = require('../ibox-title'),
    IboxContent = require('../ibox-content'),
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

    createScan: function() {
        var target = this.state.target,
            targetId = target.id,
            projectId = target.project,
            planId = this.state.detectPlan.id;

        flux.actions.scan.createScan(targetId, projectId, planId);
    },

    render: function() {
        var target = this.state.target,
            scans = this.state.scans;

        if (!target) {
            return (
                <div>{iget('No target Found')}</div>
            );
        }

        return (
            <div>
                <TargetHeader target={target}/>
                <br/>
                <Row>
                    <Col xs={12} md={4}>
                        <TargetStatus />
                        {this.renderStartScanButton()}
                    </Col>
                    <Col xs={12} md={8}>
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
        return (
            <Row>
                <Col xs={12}>
                    <Ibox>
                        <IboxContent>
                            <StartScanButton text={iget('Start detection scanning')} onClick={this.createScan}/>
                        </IboxContent>
                    </Ibox>
                </Col>
            </Row>
        );
    }
});

module.exports = Target;
