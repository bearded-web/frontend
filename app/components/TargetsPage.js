/**
 * TargetsPage
 */

import { PropTypes, Component } from 'react';
import { context } from '../lib/nf';
import { fetchTargetsPage } from '../mutators/targetMutators';
import { ANDROID } from '../lib/target-types';
import { INFO, LOW, MEDIUM, HIGH } from '../lib/severities';

import Pagination from './RoutedPagination';
import Ibox, { IboxContent } from './ibox';
import { Link } from 'react-router';

const cursors = {
    projects: ['projects'],
    targets: ['targets'],
    list: ['targetsPage', 'list'],
    pageSize: ['targetsPage', 'pageSize'],
    count: ['targetsPage', 'count']
};

@context({ cursors }, { fetchTargetsPage })
export default class TargetsPage extends Component {
    static propTypes = {
        fetchTargetsPage: PropTypes.func.isRequired,
        query: PropTypes.shape({
            page: PropTypes.string,
            project: PropTypes.string
        }),
        projects: PropTypes.object.isRequired,
        targets: PropTypes.object.isRequired,
        list: PropTypes.arrayOf(PropTypes.string.isRequired),
        pageSize: PropTypes.number,
        count: PropTypes.number
    };

    componentDidMount() {
        this.fetchPage(this.getPage(this.props));
    }

    componentWillReceiveProps(nextProps) {
        const page = this.getPage(nextProps);
        const oldPage = this.getPage(this.props);
        if (page !== oldPage) {
            this.fetchPage(page);
        }
    }

    render() {
        const { count, pageSize, list } = this.props;
        const targets = list.map(id => this.props.targets[id]);
        const page = this.getPage(this.props);

        return <Ibox><IboxContent>
            <table refCollection="targets" className="table">
                <thead><tr>
                    <th>{iget('Title')}</th>
                    <th>{iget('Project')}</th>
                    <th>{iget('Opened issues')}</th>
                </tr></thead>
                <tbody>
                    {targets.map(this.renderRow)}
                </tbody>
            </table>
            <Pagination
                count={count}
                pageSize={pageSize}
                page={page}
                className="pull-right"/>
        </IboxContent></Ibox>;
    }

    renderRow = (target) => {
        const { id, name, owner, members, type, project: pid } = target;
        const project = this.props.projects[pid];
        const pName = project ? project.name : '~';
        const title = type === ANDROID ?
            target.android.name :
            target.web.domain;

        return <tr key={id}>
            <td><Link to="target" params={{ targetId: id }}>
                {title}
            </Link></td>
            <td>{pName}</td>
            <td>{this.calculateIssuesCount(target)}</td>
        </tr>;
    }

    calculateIssuesCount(target) {
        const reducer = (c, s) => c + (target.summaryReport.issues[s] || 0);
        return target.summaryReport && target.summaryReport.issues ?
            [INFO, LOW, MEDIUM, HIGH].reduce(reducer, 0) :
            0;
    }

    getPage(props) {
        let { query: { page } } = props;
        page = parseInt(page, 10);
        return page === page ? page : 1;
    }

    fetchPage(page) {
        const filter = {};
        if (this.props.query.project) {
            filter.project = this.props.query.project;
        }
        this.props.fetchTargetsPage(page, filter);
    }
}
