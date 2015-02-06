var React = require('react');

var { Panel, Accordion } = require('react-bootstrap'),
    PanelHeader = require('../panel-header'),
    Domify = require('react-domify');

var RawReports = React.createClass({
    propTypes: {
        reports: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        return {
            expanded: false
        };
    },

    toggle: function() {
        this.setState({ expanded: !this.state.expanded });
    },

    render: function() {
        if (!this.state.expanded) {
            return (
                <h3>
                    <a onClick={this.toggle}>{iget('Show raw reports info')}</a>
                </h3>
            );
        }

        return (
            <div className="c-raw-reports">
                <h3>
                    <a onClick={this.toggle}>{iget('Hide raw reports info')}</a>
                </h3>
                {this.props.reports.map((report, i) => {
                    return (
                        <Panel key={i}>
                            {this.renderReportData(report)}
                        </Panel>
                    );
                })}
            </div>
        );
    },


    renderPanelHeader: function(sessionId) {
        return 'Header';

        //var scan = this.props.scan,
        //    session,
        //    stepName;
        //
        //if (!scan) {
        //    return '';
        //}
        //
        //session = _.find(scan.sessions, { id: sessionId });
        //stepName = session && session.step.name;
        //
        //return (
        //    <div>
        //        <PanelHeader>
        //        {stepName}
        //        </PanelHeader>
        //    </div>
        //);
    },

    renderReportData: function(report) {
        var json,
            { raw } = report;

        raw = raw.trim();

        try {
            json = JSON.parse(raw);

            if (!Object.keys(json).length) {
                return <pre>{'{}'}</pre>;
            }

            return <Domify value={json}/>;
        }
        catch(e) {
            return <pre>{raw || iget('Empty report output')}</pre>;
        }
    },

    getRawReportsFromReports: function(reports) {
        var rawReports = [];

        reports.forEach((report) => {
            if (report.type === 'raw') {
                rawReports.push(report);
            }

            if (report.type === 'multi') {
                var sub = this.getRawReportsFromReports(report.multi);

                rawReports.push.apply(rawReports, sub);
            }

        });

        return rawReports;
    }

});


module.exports = RawReports;

