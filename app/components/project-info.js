import React, { PropTypes, addons } from 'react/addons';
import { List, Map } from 'immutable';
import { setCurrentProject } from '../actions/project.actions';

import Fa from './fa';
import Members from './project-members';
import { Input } from 'react-bootstrap';
import ProjectCreateBtn from './project-create-btn';

let { ReactCSSTransitionGroup, PureRenderMixin } = addons;



export default React.createClass({
    mixins: [PureRenderMixin],

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

    onProjectSelect(e) {
        let projectId = this.refs.project.getDOMNode().value;

        this.setState({ settingsOpen: false });
        
        setCurrentProject(projectId);
    },


    render() {
        let { settingsOpen } = this.state,
            props = this.props,
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
                        return <option value={project.id}>
                            {project.name}
                        </option>
                    })}
                </select>
                <br/>
                <ProjectCreateBtn />
            </div>
            <br/>
            <Members members={current.members}/>
        </div>
    }
});