var React = require('react'),
    Router = require('react-router'),
    _ = require('lodash'),
    flux = require('../../flux');

var { Row, Col, Input, Jumbotron, Accordion, Panel } = require('react-bootstrap'),
    Header = require('../header'),
    Fa = require('../fa'),
    PanelHeader = require('../panel-header'),
    TargetScan = require('../target-scan'),
    Domify = require('react-domify');

var ScanReport = React.createClass({
    mixins: [
        Router.Navigation,
        Router.State,
        FluxMixin,
        createStoreWatchMixin('ScanStore')
    ],

    getStateFromFlux: function() {
        var { scanId } = this.getParams(),
            scanState = this.getFlux().store('ScanStore').getScanState(scanId),
            { scan } = scanState;

        if (scan && scan.status === 'finished' && scanState.reports.length !== scan.sessions.length) {
            flux.actions.scan.fetchReports(scanId);
        }

        return scanState;
    },


    statics: {
        willTransitionTo: function(transition, params) {
            flux.actions.scan.fetchReports(params.scanId);
            flux.actions.scan.fetchScans(params.scanId);
            flux.actions.plan.fetchPlans();
        }
    },


    render: function() {
        var scan = this.state.scan;

        if (!scan) {
            return <div>Loading</div>
        }

        var isFinished = scan.status === 'finished';

        return (
            <div className="c-scan-report">
                <Header>
                    <Col xs={12}>
                        <h2>{this.renderPlanInfo()}</h2>
                    </Col>
                </Header>
                <br/>

                <Row>
                    <Col md={8} mdOffset={2}>
                    {this.renderProcess()}
                    </Col>
                </Row>
            </div>
        );
    },

    renderProcess: function() {
        return (
            <TargetScan scan={this.state.scan}/>
        );
    },


    renderPlanInfo: function() {
        var { plan } = this.state,
            desc = plan && plan.desc;

        return (
            <span>{desc}</span>
        );
    }
});

module.exports = ScanReport;
