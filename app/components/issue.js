/**
 * Issue component. Contain comments, activities, description,
 * vector, references, etc.
 */

import { Component } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';

import IssueActivities from './issue-activities';
import References from './references';
import { Row, Col } from 'react-bootstrap';
import Ibox, { IboxContent, IboxTitle } from './ibox';
import Header from './header';
import SeverityIcon from './severity-icon';
import IssueComments from './IssueComments';
import Markdown from './markdown';
import Vector from './vector';
import IssueControls from './issue-controls';

export default class Issue extends Component {
    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { issue } = this.props;

        let {
            id,
            summary,
            activities,
            references,
            desc,
            vector,
            severity
            } = issue.toObject();

        const aStyle = {
            marginTop: '15px'
        };
        const hasReferences = !!(references && references.size);
        const hasActivities = !!(activities && activities.size);
        const vectorUrl = vector && vector.get('url');
        const headerStyle = {
            paddingLeft: 60
        };
        const iconStyle = {
            display: 'block',
            float: 'left',
            marginRight: '7px'
        };

        if (vectorUrl) headerStyle.marginBottom = 0;

        return <div>
            <Header>
                <Col xs={12}>
                    <h2>
                        <SeverityIcon
                            severity={severity}
                            size={37}
                            style={iconStyle}/>

                        <div style={headerStyle}>
                            {summary}
                            <br/>
                            <small>{vectorUrl}</small>
                        </div>
                    </h2>
                </Col>
            </Header>
            <Row>
                <Col xs={12} md={8}>
                    {desc && <Ibox style={aStyle}>
                        <IboxTitle title={iget('Description')}/>
                        <IboxContent>
                            <Markdown text={desc}/>
                        </IboxContent>
                    </Ibox>}
                    {hasReferences && <Ibox style={aStyle}>
                        <IboxTitle>
                            {iget('References')}
                        </IboxTitle>
                        <IboxContent>
                            <References references={references}/>
                        </IboxContent>
                    </Ibox>}
                    {vector && <Ibox style={aStyle}>
                        <IboxTitle title={iget('Vector data')}/>
                        <IboxContent>
                            <Vector vector={vector}/>
                        </IboxContent>
                    </Ibox>}

                    <Ibox style={aStyle}>
                        <IboxTitle title={iget('Comments')}/>
                        <IboxContent>
                            <IssueComments issueId={id}/>
                        </IboxContent>
                    </Ibox>
                </Col>
                <Col xs={12} md={4}>
                    <Ibox style={aStyle}>
                        <IboxTitle title={iget('Controls')}/>
                        <IboxContent>
                            <IssueControls issue={issue}/>
                        </IboxContent>
                    </Ibox>
                    <Ibox style={aStyle}>
                        <IboxTitle title={iget('Activities')}/>
                        {hasActivities && <IboxContent>
                            <IssueActivities activities={activities}/>
                        </IboxContent>}
                    </Ibox>
                </Col>
            </Row>
        </div>;
    }
}

Issue.propTypes = {
    issue: Model
};
