'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { bindAll } from 'lodash';
import { fetchOne } from '../actions/issues.actions';
import issuesStore from '../stores/issues.store';

import Issue from './issue';

export default class IssuePage extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onStoreChange'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;

        this.state = this.getState();
    }

    componentDidMount() {
        issuesStore.onChange(this.onStoreChange);

        const { issueId } = this.context.router.getCurrentParams();

        fetchOne(issueId);
    }

    componentWillUnmount() {
        issuesStore.offChange(this.onStoreChange);
    }

    onStoreChange() {
        this.setState(this.getState());
    }

    getState() {
        const { issueId } = this.context.router.getCurrentParams();
        const issue = issuesStore.getIssues(issueId).first();

        return {
            issue
        };
    }

    render() {
        const { issue } = this.state;

        return <div>
            {issue ? <Issue issue={issue}/> : ''}
        </div>;
    }
}

IssuePage.propTypes = {};
IssuePage.contextTypes = {
  router: PropTypes.func
};
