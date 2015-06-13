/**
 * NavProjectSelect
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { list } from 'react-immutable-proptypes';
import connectToStores from '../lib/connectToStores';
import projectsStore from '../stores/projectsStore';
import autobind from '../lib/autobind';
import { Model } from '../lib/types';
import { setCurrentProject } from '../actions/project.actions';
import { openCreateModal } from '../actions/project.actions';

import { DropdownButton, MenuItem } from 'react-bootstrap';

const getState = () => ({ projects: projectsStore.getRawState().toList() });

@connectToStores([projectsStore], getState)
export default class NavProjectSelect extends Component {
    static propTypes = {
        projects: list,
        project: Model
    };
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { projects, project } = this.props;

        return <DropdownButton navItem eventKey={3} title="">
            {projects.toArray().map(this.renderProjectLink)}
            <MenuItem divider/>
            <MenuItem onSelect={openCreateModal}>
                {iget('Add project')}
            </MenuItem>
        </DropdownButton>;
    }

    @autobind
    renderProjectLink(project, i) {
        const { id, name } = project.toObject();
        const handler = () => setCurrentProject(id);

        return <MenuItem onSelect={handler} eventKey={i} key={id}>
            {name}
        </MenuItem>;
    }
}
