'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { greenColor, grayColor, orangeColor, redColor } from '../style';
import { bindAll } from 'lodash';
import moment from 'moment';
import { HIGH, MEDIUM, LOW } from '../lib/severities';

import { Row, Col } from 'react-bootstrap';

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
        const { summary, severity, created } = this.props.issue.toObject();
        const createdAt = moment(created).calendar();
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

        return <Row style={style} onClick={this.onClick}>
            <Col xs={12} sm={6}>
                {this.renderIcon(severity)}
                <h3 style={summaryStyle}>{summary}</h3>
            </Col>
            <Col xs={12} sm={6} className="text-right">
                Created {createdAt}
            </Col>
        </Row>;
    }

    renderIcon(severity) {
        const iconStyle = {
            float: 'left',
            height: size,
            width: size,
            marginRight: 15,
            borderRadius: size,
            overflow: 'hidden',
            textAlign: 'center',
            lineHeight: size + 'px',
            fontSize: size - 10 + 'px',
            color: '#FFF',
            textTransform: 'uppercase'
        };

        iconStyle.backgroundColor = {
            [HIGH]: redColor,
            [MEDIUM]: orangeColor,
            [LOW]: greenColor
        }[severity];

        const letter = severity.charAt(0);

        return <div style={iconStyle}>
            {letter}
        </div>;
    }
}

IssuesListItem.propTypes = {
    issue: Model
};

IssuesListItem.contextTypes = {
    router: PropTypes.func
};
