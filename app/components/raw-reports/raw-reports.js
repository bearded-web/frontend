var React = require('react');

var { Panel, Accordion } = require('react-bootstrap'),
    PanelHeader = require('../panel-header'),
    Domify = require('react-domify');

var RawReports = React.createClass({
    propTypes: {
        reports: React.PropTypes.array.isRequired
    },

    render: function() {
        console.log(this.props.reports)

        return (
            <div className="c-raw-reports">
                <Accordion>
                     {this.props.reports.map((report, i) => {
                         return (
                             <Panel header={this.renderPanelHeader(report.scanSession)} eventKey={i + 1}>
                                 {this.renderReport(report)}
                             </Panel>
                         );
                     })}
                </Accordion>
            </div>
        );
    },


    renderReport: function(report) {
        if (report.type === 'raw') {
            return this.renderRawReport(report);
        }

        return (
            <h3>{iget('Report type (%s) not supported', report.type)}</h3>
        );
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
        return 'Header';

        var scan = this.props.scan,
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
    }
});


module.exports = RawReports;

