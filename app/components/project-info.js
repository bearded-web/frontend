'use strict';
import { PropTypes, addons, createClass } from 'react/addons';
import { Map } from 'immutable';
import { setCurrentProject } from '../actions/project.actions';
import ImMixin from 'react-immutable-render-mixin';


import Fa from './fa';
import Members from './project-members';
import ProjectCreateBtn from './project-create-btn';

export default createClass({
    mixins: [ImMixin],

    propTypes: {
        projects: PropTypes.instanceOf(Map).isRequired,
        currentProject: PropTypes.instanceOf(Map).isRequired
    },

    getInitialState() {
        return {
            settingsOpen: false
        };
    },

    componentWillReceiveProps(nextProps) {
        let { currentProject } = nextProps;

        if (currentProject !== this.props.currentProject) {
            this.setState({ settingsOpen: false });
        }

        this.refs.project.getDOMNode().value = currentProject.get('id');
    },


    toggle() {
        this.setState({
            settingsOpen: !this.state.settingsOpen
        });
    },

    onProjectSelect() {
        let projectId = this.refs.project.getDOMNode().value;

        this.setState({ settingsOpen: false });

        setCurrentProject(projectId);
    },


    render() {
        const { settingsOpen } = this.state;
        let props = this.props,
            projects = props.projects.toArray(),
            current = props.currentProject.toObject(),
            headerStyle = {
                color: 'white',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: settingsOpen ? 'none' : 'block'
            },
            settingsStyle = {
                display: settingsOpen ? 'block' : 'none'
            },
            selectStyle = {
                border: 'none',
                width: '150px',
                borderRadius: 0,
                background: '#394856',
                margin: '1px 0 6px -8px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#FFF'
            };


        return <div>
            <div>project</div>
            <h3 style={headerStyle} onClick={this.toggle}>
                <span className="pull-right">
                    <Fa icon="cog"/>
                </span>
                {current.name}
            </h3>

            <div style={settingsStyle}>
                <select
                    ref="project"
                    style={selectStyle}
                    defaultValue={current.id}
                    onChange={this.onProjectSelect}>
                    {projects.map(function(project) {
                        project = project.toObject();
                        return <option value={project.id} key={project.id}>
                            {project.name}
                        </option>;
                    })}
                </select>
                <br/>
                <ProjectCreateBtn />
            </div>
            <br/>
            <Members project={props.currentProject}/>
        </div>;
    }
});
