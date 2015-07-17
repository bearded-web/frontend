/**
 * RecentProjects
 */

import { PropTypes, Component } from 'react';
import { context } from '../lib/nf';
import { fetchRecentProjects } from '../mutators/projectsMutators';
import purify from '../lib/purify';
import { values } from 'lodash';
import moment from 'moment';

const cursors = {
    projects: ['projects']
};

@context({ cursors }, { fetchRecentProjects })
@purify
export default class RecentProjects extends Component {
    static propTypes = {
        fetchRecentProjects: PropTypes.func.isRequired,
        projects: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.fetchRecentProjects();
    }

    render() {
        const projects = values(this.props.projects)
            .sort((a, b) => moment(a.created).isBefore(b.created))
            .slice(0, 10)
            .map(this.renderUser);

        return <div>
            {projects}
        </div>;
    }

    renderUser(user) {
        const { id, name } = user;
        return <div key={id}>
            <hr/>
           {name}
        </div>;
    }
}
