var React = require('react'),
    Router = require('react-router'),
    _ = require('lodash'),
    flux = require('../../flux');

var { Row, Col, Input, Jumbotron } = require('react-bootstrap'),
    Header = require('../header'),
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
        var { scanId } = this.getParams();

        return this.getFlux().store('ScanStore').getScanState(scanId);
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
        return this.state.reports.map((report) => {
            return (
                <Row>
                    <Col xs={12}>
                        <Jumbotron>
                            <h3>
                                {this.renderSessionInfo(report.scanSession)}
                            </h3>
                            {this.renderReport(report)}
                        </Jumbotron>
                    </Col>
                </Row>
            );
        });
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

    renderSessionInfo: function(sessionId) {
        var scan = this.state.scan,
            session,
            stepName;

        if (!scan) {
            return '';
        }

        session = _.find(scan.sessions, { id: sessionId });
        stepName = session && session.step.name;

        return (
            <span>{stepName}</span>
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
