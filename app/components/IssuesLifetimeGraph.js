/**
 * IssuesLifetimeGraph
 */

import { PropTypes, Component } from 'react';
import { Issue } from '../lib/types';
import autobind from '../lib/autobind';
import { color } from '../lib/severities';

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
            end: issue.resolvedAt || new Date(),
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
