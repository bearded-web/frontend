'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Models } from '../lib/types';
import { bindAll } from 'lodash';

import IssuesListItem from './issues-list-item';
import Ibox, { IboxContent } from './ibox';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export default class IssuesList extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'renderIssue'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { issues } = this.props;

        console.log('### l', issues.size);
        return <div>
            {issues.toArray().map(this.renderIssue)}
        </div>;
    }

    renderIssue(issue) {
        const id = issue.get('id');

        return <IssuesListItem issue={issue} key={id}/>;
    }
}

IssuesList.propTypes = {
    issues: Models
};

