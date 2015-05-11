/**
 * IssuesList
 */

import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { listOf } from 'react-immutable-proptypes';
import bind from '../lib/autobind';

import IssuesListItem from './issues-list-item';

export default class IssuesList extends Component {
    static propTypes = {
        issues: listOf(Model)
    };

    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { issues } = this.props;

        if (!issues) return <h1 className="text-center">Loading</h1>;

        return <div>
            {issues.toArray().map(this.renderIssue)}
        </div>;
    }

    @bind
    renderIssue(issue) {
        const id = issue.get('id');

        return <IssuesListItem issue={issue} key={id}/>;
    }
}

