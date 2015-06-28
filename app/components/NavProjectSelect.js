/**
 * NavProjectSelect
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import autobind from '../lib/autobind';
import { Project } from '../lib/types';
import { values } from 'lodash';
// import { setCurrentProject } from '../actions/project.actions';
import { openCreateModal } from '../actions/project.actions';
import { context } from '../lib/nf';
import { setCurrentProject } from '../mutators/projectsMutators';

import { MenuItem, SplitButton } from 'react-bootstrap';

const cursors = { projects: ['projects'] };

@context({ cursors }, { setCurrentProject })
export default class NavProjectSelect extends Component {
    static propTypes = {
        projects: PropTypes.object,
        setCurrentProject: PropTypes.func.isRequired,
        project: Project
    };
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    @autobind
    goToOverview() {
        this.context.router.transitionTo('overview');
    }

    render() {
        const { projects, project } = this.props;

        return <SplitButton
            bsStyle="default"
            title={project.name}
            className="btn-white navbar-btn"
            onClick={this.goToOverview}>
            {values(projects).map(this.renderProjectLink)}
            <MenuItem divider />
            <MenuItem onSelect={openCreateModal}>
                {iget('Add project')}
            </MenuItem>
        </SplitButton>;
    }

    @autobind
    renderProjectLink(project, i) {
        const { id, name } = project;
        const handler = () => {
            this.props.setCurrentProject(id);
            this.goToOverview();
        };

        return <MenuItem onSelect={handler} eventKey={i} key={id}>
            {name}
        </MenuItem>;
    }
}
