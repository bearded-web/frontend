import { Component } from 'react';
import { Target } from '../lib/types';
import { startsWith } from 'lodash';
import { ANDROID } from '../lib/target-types';

import { Label } from 'react-bootstrap';
import { Link } from 'react-router';
import Fa from './fa';

export default class TargetLabel extends Component {
    static propTypes = {
        target: Target
    }

    render() {
        return this.renderTargetLabel(this.props.target);
    }

    renderTargetLabel(target) {
        let isHttps = false;

        let title = target.type === ANDROID ?
            target.android.name :
            target.web.domain;

        if (startsWith(title, 'http://')) {
            title = title.slice(7);
        }

        if (startsWith(title, 'https://')) {
            title = title.slice(8);
            isHttps = true;
        }

        const icon = target.type === ANDROID ?
            'android' :
            isHttps ? 'lock' : 'globe';

        return <span>
            <Fa ref="icon" icon={icon}/>
            &nbsp;
            {title}
            {this.renderIssuesLabel(target)}
            &nbsp;
        </span>;
    }

    renderIssuesLabel(target) {
        const { issues } = target.summaryReport || { issues: {} };

        let count = 0;
        let labelStyle;

        if (issues.low) {
            count = issues.low;
            labelStyle = 'info';
        }

        if (issues.medium) {
            count = issues.medium;
            labelStyle = 'warning';
        }

        if (issues.high) {
            count = issues.high;
            labelStyle = 'danger';
        }

        if (!count) return '';

        const style = {
            marginLeft: '0.3rem',
            marginTop: '0.35rem'
        };

        return <Label ref="count" bsStyle={labelStyle} style={style}>{count}</Label>;
    }
}
