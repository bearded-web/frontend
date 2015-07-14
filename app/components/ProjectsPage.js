/**
 * ProjectsPage
 */

import { PropTypes, Component } from 'react';
import { context } from '../lib/nf';
import { fetchProjectsPage } from '../mutators/projectsMutators';

import Pagination from './RoutedPagination';
import Ibox, { IboxContent } from './ibox';
import { Link } from 'react-router';

const obj = PropTypes.object.isRequired;
const cursors = {
    users: ['users'],
    projects: ['projects'],
    list: ['projectsPage', 'list'],
    pageSize: ['projectsPage', 'pageSize'],
    count: ['projectsPage', 'count']
};

@context({ cursors }, { fetchProjectsPage })
export default class ProjectsPage extends Component {
    static propTypes = {
        users: obj,
        projects: obj,
        list: PropTypes.arrayOf(PropTypes.string).isRequired,
        pageSize: PropTypes.number,
        count: PropTypes.number,
        fetchProjectsPage: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.fetchProjectsPage(this.getPage(this.props));
    }

    componentWillReceiveProps(nextProps) {
        const page = this.getPage(nextProps);
        const oldPage = this.getPage(this.props);
        if (page !== oldPage) {
            this.props.fetchProjectsPage(page);
        }
    }

    render() {
        const { count, pageSize, list } = this.props;
        const projects = list.map(id => this.props.projects[id]);
        const page = this.getPage(this.props);

        return <Ibox><IboxContent>
            <table className="table">
                <thead><tr>
                    <th>{iget('Name')}</th>
                    <th>{iget('Owner')}</th>
                    <th>{iget('Members count')}</th>
                </tr></thead>
                <tbody refCollection="projects">
                    {projects.map(this.renderRow)}
                </tbody>
            </table>
            <Pagination
                count={count}
                pageSize={pageSize}
                page={page}
                className="pull-right"/>
        </IboxContent></Ibox>;
    }

    renderRow = (project) => {
        const { id, name, owner, members } = project;
        const user = this.props.users[owner];
        const userName = user ? user.nickname : '~';

        return <tr key={id}>
            <td>{name}</td>
            <td>{userName}</td>
            <td>{members.length}</td>
            <td>
                <Link to="targets" query={{ project: id }}>
                    {iget('Targets')}
                </Link>
            </td>
        </tr>;
    }

    getPage(props) {
        let { query: { page } } = props;
        page = parseInt(page, 10);
        return page === page ? page : 1;
    }
}
