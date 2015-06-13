import { PropTypes, Component } from 'react/addons';
import { isArray, isUndefined, assign, capitalize } from 'lodash';
import { selectSeverity } from '../../actions/report.actions';
import { HIGH, MEDIUM, LOW, INFO } from '../../lib/severities';

import SeverityWidget from '../SeverityWidget';
import SeverityLevelDesc from '../severity-level-desc';
import ReportIssuesDetail from '../report-issues-detail';
import { Row, Col } from 'react-bootstrap';

export default class ReportIssues extends Component {
    static propTypes = {
        severity: PropTypes.string,
        reports: PropTypes.array.isRequired,
        onSeveritySelect: PropTypes.func
    }
    static defaultProps = {
        onSeveritySelect: () => null
    };

    render() {
        const { severity, reports } = this.props;
        const issues = this.getIssuesFromReports(reports);
        const selectedIssues = issues[severity] || [];

        const renderColumn = s => <Col xs={3}>
            {this.renderTotal(s, issues)}
        </Col>;
        return (
            <div className="c-report-issues">
                <Row>
                    {[HIGH, MEDIUM, LOW, INFO].map(renderColumn)}
                </Row>

                <h2 className="c-report-issues--details">{capitalize(severity) + ' severity'}</h2>
                {selectedIssues.length ? this.renderDetails(selectedIssues, severity) : <span></span>}
            </div>
        );
    }

    renderDetails(issues, severity) {
        return (
            <div className="c-report-issues--details">
                <h3>{iget('Detailed report')}</h3>

                <div classNamae="c-report-issues-desc">
                    <SeverityLevelDesc severity={severity} count={issues.length}/>
                </div>
                <br/>
                <Row>
                    <Col xs={12}>
                        <ReportIssuesDetail issues={issues}/>
                    </Col>
                </Row>
            </div>
        );
    }

    renderTotal(severity, issues) {
        const count = issues[severity].length;
        const props = {};

        if (count) {
            props.onClick = () => {
                if (count) this.props.onSeveritySelect(severity);
            };
            props.style = { cursor: 'pointer' };
        }

        return <div {...props}>
            <SeverityWidget
                severity={severity}
                count={count}/>
        </div>;
    }

    getIssuesFromReports(reports) {
        const issues = {
            info: [],
            low: [],
            medium: [],
            high: [],
            error: []

        };

        reports.forEach((report) => {
            if (report.type === 'issues') {
                report.issues.forEach(function(issue) {
                    issues[issue.severity].push(issue);
                });
            }

            if (report.type === 'multi') {
                const subIssues = this.getIssuesFromReports(report.multi);

                this.mergeIssues(issues, subIssues);
            }

        });

        return issues;
    }

    mergeIssues(target, source) {
        return assign(target, source, function(a, b) {
            if (isUndefined(a)) return b;

            return isArray(a) ? a.concat(b) : undefined;
        });
    }
}

if (module.hot) {
    module.hot.accept([
        '../SeverityWidget',
        '../report-issues-detail'
    ], function() {
        //TODO flux add actions
    });
}
