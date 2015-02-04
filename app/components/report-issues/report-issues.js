var React = require('react'),
    { PropTypes } = React,
    _ = require('lodash'),
    actions = require('../../actions/report.actions');

var ReportIssuesTotal = require('../report-issues-total'),
    ReportIssuesDetail = require('../report-issues-detail'),
    { Row, Col } = require('react-bootstrap');

var ReportIssues = React.createClass({
    propTypes: {
        severity: PropTypes.string,
        reports: PropTypes.array.isRequired
    },

    render: function() {
        var { severity, reports } = this.props,
            issues = this.getIssuesFromReports(reports),
            selectedIssues = issues[severity] || [];

        nextTick(() => this.setDefaultSeverity(severity, issues));

        return (
            <div className="c-report-issues">
                <Row>
                    {this.renderTotal('hi', issues)}
                    {this.renderTotal('medium', issues)}
                    {this.renderTotal('low', issues)}
                </Row>
                <ReportIssuesDetail issues={selectedIssues} />
            </div>
        );
    },

    renderTotal: function(severity, issues) {
        return (
            <ReportIssuesTotal
                severity={severity}
                selected={this.props.severity === severity}
                count={issues[severity].length} />
        );
    },

    setDefaultSeverity: function(severity, issues) {
        if (severity) return;

        if (issues.hi.length) {
            severity = 'hi';
        }
        if (issues.medium.length) {
            severity = 'medium';
        }
        if (issues.low.length) {
            severity = 'low';
        }

        if (severity) actions.selectSeverity(severity);
    },

    getIssuesFromReports: function(reports) {
        var issues = {
            low: [],
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
        '../report-issues-total',
        '../report-issues-detail'
    ], function() {
        //TODO flux add actions
    });
}
