var React = require('react');

import { Panel, Table } from 'react-bootstrap';
import Domify from 'react-domify';
import { captureException } from '../../lib/raven';

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

        return <div className="c-raw-reports">
            <h3>
                <a onClick={this.toggle}>{iget('Hide raw reports info')}</a>
            </h3>
            {this.props.reports.map((report, i) => {
                return (
                    <Panel key={i}>
                        {this.renderReportData(report)}
                        {report.files ? this.renderFilesTable(report.files) : ''}
                    </Panel>
                );
            })}
        </div>;
    },


    renderPanelHeader: function(/*sessionId*/) {
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

        if (!raw) {
            return <span>{iget('Empty report output')}</span>;
        }

        raw = raw.trim();

        try {
            json = JSON.parse(raw);

            if (!Object.keys(json).length) {
                return <pre>{'{}'}</pre>;
            }

            return <Domify value={json}/>;
        }
        catch (e) {
            captureException(e);

            return <pre>{raw}</pre>;
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
    },

    renderFilesTable: function(files) {
        return <Table>
            <thead>
            <tr>
                <td><h4>{iget('Artifacts')}:</h4></td>
            </tr>
            </thead>
            <tbody>
            {files.map(this.renderFile)}
            </tbody>
        </Table>;
    },

    renderFile: function(file) {
        return (
            <tr key={file.id}>
                <td className="c-report-issues-detail--file">
                    <a href={'api/v1/files/' + file.id + '/download'}>{file.name}</a> - <span
                    className="small">{file.size + iget('b')}</span>
                </td>
            </tr>
        );
    }

});


module.exports = RawReports;

