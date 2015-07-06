/**
 * ReportPage
 */

import { PropTypes, Component } from 'react/addons';
import { context } from '../lib/nf';
import { fetchScanReports } from '../mutators/reportMutators';
import autobind from '../lib/autobind';
import { cloneDeep } from 'lodash';

import ReportIssues from './report-issues';
import RawReports from './raw-reports';
import ReportTechs from './report-techs';

const facets = { reports: 'scanReports' };

@context({ facets }, { fetchScanReports })
export default class ReportPage extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    static propTypes = {
        query: PropTypes.shape({
            severity: PropTypes.string,
            scan: PropTypes.string
        }).isRequired,
        reports: PropTypes.array.isRequired, //TODO add model
        fetchScanReports: PropTypes.func.isRequired
    };

    componentWillMount() {
        //TODO setTitle + test
        this.props.fetchScanReports(this.props.query.scan);
    }

    @autobind
    onSeveritySelect(severity) {
        const path = this.context.router.getCurrentPath();
        const params = this.context.router.getCurrentParams();
        const query = cloneDeep(this.context.router.getCurrentQuery());
        query.severity = severity;
        this.context.router.transitionTo(path, params, query);
    }

    render() {
        const { reports, query: { severity } } = this.props;
        return <div>
            <ReportIssues
                ref="issues"
                onSeveritySelect={this.onSeveritySelect}
                reports={reports}
                severity={severity}/>

            <ReportTechs ref="techs" reports={reports}/>
            <RawReports ref="rawReports" reports={reports}/>
        </div>;
    }
}


if (module.hot) {
    module.hot.accept([
        '../lib/nf',
        '../raw-reports',
        '../report-issues',
        '../report-techs'
    ]);
}
