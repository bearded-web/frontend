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
            return (
                <div>Loading</div>
            );
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
                
                {isFinished ? this.renderReports() : this.renderProcess()}
            </div>
        );
    },

    renderProcess: function() {
        return (
            <TargetScan scan={this.state.scan}/>
        );
    },

    renderReports: function() {
        return (
            <Row>
                <Col xs={12}>
                    <Accordion>
                        {this.state.reports.map((report, i) => {
                            return (
                                <Panel header={this.renderPanelHeader(report.scanSession)} eventKey={i + 1}>
                                        {this.renderReport(report)}
                                </Panel>
                            );
                        })}
                    </Accordion>
                </Col>
            </Row>
        );
    },

    renderReport: function(report) {
        if (report.type === 'raw') {
            return this.renderRawReport(report);
        }

        return (
            <h3>{iget('Report type (%s) not supported', report.type)}</h3>
        )
    },

    renderRawReport: function(report) {
        var raw;

        try {
            raw = JSON.parse(report.raw);
            return (<Domify value={raw}/>);
        } catch (e) {
            return (
                <pre>
                    {report.raw}
                </pre>
            );
        }
    },

    renderPanelHeader: function(sessionId) {
        var scan = this.state.scan,
            session,
            stepName;

        if (!scan) {
            return '';
        }

        session = _.find(scan.sessions, { id: sessionId });
        stepName = session && session.step.name;

        return (
            <div>
                <PanelHeader>
                {stepName}
                </PanelHeader>
            </div>
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
