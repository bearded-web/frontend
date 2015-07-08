/**
 * ProjectPage
 */

import { Component, PropTypes } from 'react/addons';
import setTitle from '../lib/set-title';
import { Project } from '../lib/types';
import purify from '../lib/purify';
import { context } from '../lib/nf';
import { openAddMemberModal } from '../actions/project.actions';
import { fromJS } from 'immutable';
import autobind from '../lib/autobind';
import { create as createStyle } from 'react-style';
import { values, where } from 'lodash';
import { fetchIssues } from '../mutators/issueMutators';

import Ibox, { IboxContent, IboxTitle } from './ibox';
import { Col, Row, Well, Button } from 'react-bootstrap';
import Members from './EditableMembers';
import Feed from './FeedFlow';
import Loading from './Loading';
import IssuesLifetimeGraph from './IssuesLifetimeGraph';

const cursors = { issues: ['issues'] };
const facets = {
    project: 'currentProject'
};
const S = createStyle({
    noBorder: { padding: 0 },
    header: { marginBottom: 0 }
});

@context({ cursors, facets }, { fetchIssues })
@purify
export default class ProjectPage extends Component {
    static propTypes = {
        fetchIssues: PropTypes.func.isRequired,
        project: Project,
        issues: PropTypes.object
    };
    static defaultProps = {
        issues: {}
    };

    componentDidMount() {
        setTitle(iget('Dashboard'));

        this.fetchIssuesForProject(this.props.project);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.project !== this.props.project) {
            this.fetchIssuesForProject(nextProps.project);
        }
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
        const { members, name, id } = project;
        const issues = where(values(this.props.issues), { project: id });

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
            </Ibox><Ibox>
                <IboxTitle title={iget('Timeline')}/>
                <IboxContent style={S.noBorder}>
                    <IssuesLifetimeGraph ref="lifetime" issues={issues}/>
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

    fetchIssuesForProject(project) {
        if (project) {
            this.props.fetchIssues({ project: project.id });
        }
    }
}
