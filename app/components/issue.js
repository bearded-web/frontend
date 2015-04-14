/**
 * Issue component. Contain comments, activities, description,
 * vector, references, etc.
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';

import IssueActivities from './issue-activities';
import References from './references';
import { Grid, Row, Col } from 'react-bootstrap';
import Ibox, { IboxContent, IboxTitle } from './ibox';
import Header from './header';
import SeverityIcon from './severity-icon';
import CommentForm from './comment-form';
import Comments from './comments';
import Markdown from 'react-markdown-el';

export default class Issue extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const {
            summary,
            activities,
            references,
            desc,
            vector,
            severity
            } = this.props.issue.toObject();

        const aStyle = {
            marginTop: '15px'
        };
        const hasReferences = !!(references && references.size);
        const hasActivities = !!(activities && activities.size);
        const vectorUrl = vector && vector.get('url');
        const headerStyle = {};
        const iconStyle = {
            display: 'block',
            float: 'left',
            marginRight: '7px'
        };

        if (vectorUrl) headerStyle.marginBottom = 0;

        return <div>
            <Header>
                <Col xs={12}>
                    <h2 style={headerStyle}>
                        <SeverityIcon
                            severity={severity}
                            size={37}
                            style={iconStyle}/>

                        <div>
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
                        <IboxTitle>
                            {iget('Description')}
                        </IboxTitle>
                        <IboxContent>
                            <Markdown text={desc}/>
                        </IboxContent>
                    </Ibox>}
                    <Ibox style={aStyle}>
                        <IboxTitle>
                            {iget('References')}
                        </IboxTitle>
                        {hasReferences && <IboxContent>
                            <References references={references}/>
                        </IboxContent>}
                    </Ibox>
                </Col>
                <Col xs={12} md={4}>
                    <Ibox style={aStyle}>
                        <IboxTitle>
                            {iget('Activities')}
                        </IboxTitle>
                        {hasActivities && <IboxContent>
                            <IssueActivities activities={activities}/>
                        </IboxContent>}
                    </Ibox>
                    <Ibox style={aStyle}>
                        <IboxTitle>
                            {iget('Comments')}
                        </IboxTitle>
                        <IboxContent>
                            <CommentForm/>
                        </IboxContent>
                    </Ibox>
                </Col>
            </Row>
        </div>;
    }
}

Issue.propTypes = {
    issue: Model
};

