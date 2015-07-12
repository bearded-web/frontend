/**
 * IssuesLifetimeGraph
 */

import { PropTypes, Component } from 'react';
import { Issue } from '../lib/types';
import autobind from '../lib/autobind';
import { color } from '../lib/severities';
import moment from 'moment';

import Timeline from './Timeline';

export default class IssuesLifetimeGraph extends Component {
    static contextTypes = {
        router: PropTypes.func.isRequired
    };
    static propTypes = {
        issues: PropTypes.arrayOf(Issue)
    };
    static defaultProps = {
        issues: []
    };

    shouldComponentUpdate(nextProps) {
        const { issues } = nextProps;
        const oldIssues = this.props.issues;

        return issues.length !== oldIssues.length ||
            issues.some((issue, i) => {
                const oldIssue = oldIssues[i];
                if (issue.id !== oldIssue.id) return true;
                if (issue.summary !== oldIssue.summary) return true;
                if (issue.resolved !== oldIssue.resolved) return true;
                if (!moment(issue.created).isSame(oldIssue.created)) return true;
                if (issue.resolvedAt ? !oldIssue.resolvedAt : oldIssue.resolvedAt) return true;
                if (issue.resolvedAt && oldIssue.resolvedAt &&
                    !moment(issue.resolvedAt).isSame(oldIssue.resolvedAt)) return true;
            });
    }

    @autobind
    onSelect({ items }) {
        const item = items[0];
        if (item) {
            this.context.router.transitionTo('issue', { issueId: item });
        }
    }

    render() {
        const items = this.props.issues.map(issue => ({
            id: issue.id,
            content: issue.summary,
            start: issue.created,
            end: issue.resolved ? issue.resolvedAt : new Date(),
            style: `background-color: ${color(issue.severity)}`
        }));

        return <Timeline
            items={items}
            maxHeight={500}
            minHeight={200}
            onSelect={this.onSelect}
            ref="timeline"/>;
    }
}
