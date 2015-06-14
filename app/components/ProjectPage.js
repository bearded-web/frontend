/**
 * ProjectOverview
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import setTitle from '../lib/set-title';
import { Project } from '../lib/types';
import purify from '../lib/purify';

import Fa from './fa';
import Ibox, { IboxContent, IboxTitle } from './ibox';
import { Col, Row } from 'react-bootstrap';
import Members from './Members';
import Feed from './feed';

@purify
export default class ProjectPage extends Component {
    static propTypes = {
        project: Project
    };

    componentDidMount() {
        setTitle(iget('Dashboard'));
    }

    render() {
        const { project } = this.props;
        const { members } = project;

        return <Row>
            <Col md={6}><Row><Col md={6}>
                <Ibox>
                    <IboxTitle title={iget('Members')}/>
                    <IboxContent>
                        <Members ref="members" members={members}/>
                    </IboxContent>
                </Ibox>
            </Col></Row></Col>
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

