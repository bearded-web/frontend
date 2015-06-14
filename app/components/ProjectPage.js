/**
 * ProjectPage
 */

import { PropTypes, Component } from 'react/addons';
import setTitle from '../lib/set-title';
import { Project } from '../lib/types';
import purify from '../lib/purify';
import { context } from '../lib/nf';

import Ibox, { IboxContent, IboxTitle } from './ibox';
import { Col, Row } from 'react-bootstrap';
import Members from './Members';
import Feed from './feed';
import Loading from './Loading';

const facets = {
    project: 'currentProject'
};

@context({ facets })
export default class ProjectPage extends Component {
    static propTypes = {
        project: Project
    };

    componentDidMount() {
        setTitle(iget('Dashboard'));
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
                    <Members ref="members" members={members}/>
                </IboxContent>
            </Ibox></Col>
            <Col md={6}>
                <Ibox>
                    <IboxContent>
                        <Feed ref="feed" source={project} type="project"/>
                    </IboxContent>
                </Ibox>
            </Col>
        </Row>;
    }
}

