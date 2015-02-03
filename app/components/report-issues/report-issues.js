var React = require('react'),
    _ = require('lodash');

var ReportIssuesTotal = require('../report-issues-total'),
    { Row, Col, Table } = require('react-bootstrap');

var ReportIssues = React.createClass({

    getInitialState: function() {
        return {
            selectedSeverity: null
        };
    },


    render: function() {
        var issues = this.getIssuesFromReports(this.props.reports),
            { selectedSeverity } = this.state,
            selectedIssues = issues[selectedSeverity];

        return (
            <div className="c-report-issues">
                <Row>
                    <Col xs={4} onClick={this.buildTotalOnClick('hi')}>
                        <ReportIssuesTotal severity="hi" count={issues.lo.length} />
                    </Col>
                    <Col xs={4} onClick={this.buildTotalOnClick('medium')}>
                        <ReportIssuesTotal severity="medium" count={issues.lo.length} />
                    </Col>
                    <Col xs={4} onClick={this.buildTotalOnClick('lo')}>
                        <ReportIssuesTotal severity="lo" count={issues.lo.length} />
                    </Col>
                </Row>
                { selectedIssues && this.renderIssues(selectedIssues) }
            </div>
        );
    },

    renderIssues: function(selectedIssues) {
        return (
            <Row>
                <Col xs={12}>
                    <Table striped bordered condensed hover>
                        <tbody>
                        {selectedIssues.map(function(issue) {
                            return (
                                <tr>
                                    <td>
                                        {issue.summary}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    },

    buildTotalOnClick: function(severity) {
        return () => this.setState({ selectedSeverity: severity });
    },

    getIssuesFromReports: function(reports) {
        var issues = {
            lo: [],
            medium: [],
            hi: []
        };

        reports.forEach((report) => {
            if (report.type === 'issues') {
                report.issues.forEach(function(issue) {
                    issues[issue.severity].push(issue);
                });
            }

            if (report.type === 'multi') {
                var subIssues = this.getIssuesFromReports(report.multi);

                this.mergeIssues(issues, subIssues);
            }

        });

        return issues;
    },

    mergeIssues: function(target, source) {
        return _.assign(target, source, function(a, b) {
            if (_.isUndefined(a)) return b;

            return _.isArray(a) ? a.concat(b) : undefined;
        });
    }
});

module.exports = ReportIssues;


if (module.hot) {
    module.hot.accept([
        '../report-issues-total'
    ], function() {
        //TODO flux add actions
    });
}
