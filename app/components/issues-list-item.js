'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { bindAll } from 'lodash';
import moment from 'moment';

import { Row, Col } from 'react-bootstrap';
import SeverityIcon from './severity-icon';
import IssueListItemsControls from './issue-list-items-controls';

const size = 25;

export default class IssuesListItem extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onClick'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onClick() {
        this.context.router.transitionTo('issue', {
            issueId: this.props.issue.get('id')
        });
    }

    render() {
        const { issue } = this.props;
        const { summary, severity, created } = issue.toObject();
        const createdAt = moment(created).format('YYYY-MM-DD HH:mm');
        const style = {
            padding: '10px',
            background: '#FFF',
            margin: '4px 0',
            cursor: 'pointer',
            lineHeight: '25px'
        };
        const summaryStyle = {
            lineHeight: size + 'px',
            display: 'inline'
        };
        const iconStyle = {
            display: 'block',
            marginRight: '1rem',
            float: 'left'
        };
        const controlsStyle = { display: 'inline', marginLeft: '2rem' };

        return <Row style={style} onClick={this.onClick}>
            <Col xs={12} sm={6}>
                <SeverityIcon severity={severity} size={24} style={iconStyle}/>
                &nbsp;
                &nbsp;
                <h3 style={summaryStyle}>{summary}</h3>
            </Col>
            <Col xs={12} sm={6} className="text-right">
                Created {createdAt}
                <IssueListItemsControls issue={issue} style={controlsStyle}/>
            </Col>
        </Row>;
    }
}

IssuesListItem.propTypes = {
    issue: Model
};

IssuesListItem.contextTypes = {
    router: PropTypes.func
};
