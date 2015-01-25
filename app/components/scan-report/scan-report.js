var React = require('react'),
    Router = require('react-router'),
    flux = require('../../flux');

var { Row, Col, Input, Jumbotron } = require('react-bootstrap'),
    Domify = require('react-domify');

var ScanReport = React.createClass({
    mixins: [
        Router.Navigation,
        FluxMixin,
        createStoreWatchMixin('ScanStore')
    ],

    getStateFromFlux: function() {
        return this.getFlux().store('ScanStore').getState();
    },


    statics: {
        willTransitionTo: function(transition, params) {
            flux.actions.scan.fetchReports(params.scanId);
        }
    },


    render: function() {
        return (
            <div className="c-scan-report">
                <br/>
                {this.state.reports.map((report) => {
                    return (
                        <Row>
                            <Col xs={12}>
                                <Jumbotron>
                                    <h3>
                                        {iget('Report data')}
                                        <br/>
                                        <small>Scan session: {report.scanSession}</small>
                                    </h3>
                                    {this.renderReport(report)}
                                </Jumbotron>
                            </Col>
                        </Row>
                    );
                })}
            </div>
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
    }
});

module.exports = ScanReport;
