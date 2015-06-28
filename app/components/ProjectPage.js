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
import { create as createStyle } from 'react-style';

import Ibox, { IboxContent, IboxTitle } from './ibox';
import { Col, Row, Well, Button } from 'react-bootstrap';
import Members from './EditableMembers';
import Feed from './FeedFlow';
import Loading from './Loading';

const facets = {
    project: 'currentProject'
};
const S = {
    header: { marginBottom: 0 }
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
            return <h3>
                <Loading ref="loading" text={iget('Loading project')}/>
            </h3>;
        }

        const { members, name } = project;

        return <Row>
            <br/>
            <Col xs={12}><Well>
                <div className="pull-right">
                    <Button
                        bsSize="xsmall"
                        disabled
                        bsStyle="danger">
                        {iget('Delete project')}
                    </Button>
                </div>
                <h3 style={S.header}>
                    <strong>{name}</strong>
                    &nbsp;
                    {iget('project')}
                </h3>
            </Well></Col>
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
