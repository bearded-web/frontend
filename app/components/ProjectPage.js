/**
 * ProjectPage
 */

import { Component } from 'react/addons';
import setTitle from '../lib/set-title';
import { Project } from '../lib/types';
import purify from '../lib/purify';
import { context } from '../lib/nf';
import { openAddMemberModal } from '../actions/project.actions';
import { fromJS } from 'immutable';
import autobind from '../lib/autobind';

import Ibox, { IboxContent, IboxTitle } from './ibox';
import { Col, Row } from 'react-bootstrap';
import Members from './EditableMembers';
import Feed from './FeedFlow';
import Loading from './Loading';

const facets = {
    project: 'currentProject'
};

@context({ facets })
@purify
export default class ProjectPage extends Component {
    static propTypes = {
        project: Project
    };

    componentDidMount() {
        setTitle(iget('Dashboard'));
    }

    @autobind
    onMembersClick() {
        openAddMemberModal(fromJS(this.props.project));
    }

    render() {
        const { project } = this.props;

        if (!project) {
            return <h2>
                <Loading ref="loading" text={iget('Loading project')}/>
            </h2>;
        }

        const { members } = project;

        return <Row>
            <br/>
            <br/>
            <Col md={6}><Ibox>
                <IboxTitle title={iget('Members')}/>
                <IboxContent>
                    <Members
                        ref="members"
                        members={members}
                        project={project}/>
                </IboxContent>
            </Ibox></Col>
            <Col md={6}>
                <Ibox>
                    <IboxTitle title={iget('Project feed')}/>
                    <IboxContent>
                        <Feed ref="feed" source={project} type="project"/>
                    </IboxContent>
                </Ibox>
            </Col>
        </Row>;
    }
}
