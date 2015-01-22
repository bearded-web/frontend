var Router = require('react-router'),
    flux = require('../../flux');

var { Row, Col } = require('react-bootstrap'),
    TargetHeader = require('../target-header'),
    Activites = require('../activites'),
    Fa = require('../fa'),
    Ibox = require('../ibox'),
    IboxTitle = require('../ibox-title'),
    IboxContent = require('../ibox-content'),
    TargetScan = require('../target-scan'),
    TargetStatus = require('../target-status'),
    Widget = require('../widget');

module.exports = React.createClass({
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

    removeTarget: function() {
        this.getFlux().actions.target.removeTarget(this.state.target);
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
                <TargetHeader title={target.web.domain} removeTarget={this.removeTarget}/>
                <br/>
                <Row>
                    <Col xs={12} md={4}>
                        <Row>
                            <Col xs={12}>
                                <Ibox>
                                    <IboxTitle>
                                        <h5>{iget('Curernt status')}</h5>
                                    </IboxTitle>
                                    <IboxContent>
                                        <TargetStatus />
                                    </IboxContent>
                                </Ibox>
                            </Col>
                        </Row>
                        {this.renderStartScanButton()}
                        {scans.length ? this.renderScans() : ''}
                    </Col>
                    <Col xs={12} md={8}>
                        <Ibox>
                            <IboxTitle>
                                <h5>{iget('Target timeline')}</h5>
                            </IboxTitle>
                            <IboxContent>
                                <Activites />
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
                            <a onClick={this.createScan}>
                                <Fa icon="play" size="2x" fw align="middle"/>
                                <span className="target-scan--text">{iget('Start scanning')}</span>
                            </a>

                        </IboxContent>
                    </Ibox>
                </Col>
            </Row>
        );
    },

    renderScans: function() {
        var scans = this.state.scans;

        if (!scans.length) {

        }

        return (
            <div>
                {scans.map(function(scan) {
                    return (
                        <Row>
                            <Col xs={12}>
                                <Ibox>
                                    <IboxContent>
                                        <TargetScan scan={scan}/>

                                    </IboxContent>
                                </Ibox>
                            </Col>
                        </Row>
                    );
                })}
            </div>
        );
    }
});
