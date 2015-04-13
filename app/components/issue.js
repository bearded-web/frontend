'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';

import IssueActivities from './issue-activities';
import IssueExtras from './issue-extras';
import { Grid, Row, Col } from 'react-bootstrap';
import Ibox, { IboxContent, IboxTitle } from './ibox';
import Header from './header';

export default class Issue extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { summary, activities, extras } = this.props.issue.toObject();
        const aStyle = {
            marginTop: '15px'
        };
        const hasExtras = !!(extras && extras.size);
        const hasActivities = !!(activities && activities.size);

        return <div>
            <Header>
                <Col xs={12}>
                    <h2>{summary}</h2>
                </Col>
            </Header>
            <Row>
                <Col xs={12} md={8}>
                    <Ibox style={aStyle}>
                        <IboxTitle>
                            {iget('Extras')}
                        </IboxTitle>
                        {hasExtras && <IboxContent>
                            <IssueExtras extras={extras}/>
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
                </Col>
            </Row>
        </div>;
    }
}

Issue.propTypes = {
    issue: Model
};

