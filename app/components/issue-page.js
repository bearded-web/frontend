'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { bindAll } from 'lodash';
import { fetchOne } from '../actions/issues.actions';
import issuesStore from '../stores/issues.store';
import setTitle from '../lib/set-title';

import Issue from './issue';

export default class IssuePage extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onStoreChange'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;

        this.state = this.getState();

        this.setTitle(this.state);
    }

    //region life cycle
    componentDidMount() {
        issuesStore.onChange(this.onStoreChange);

        this.prefetch();
    }

    componentWillUnmount() {
        issuesStore.offChange(this.onStoreChange);
    }

    componentWillReceiveProps() {
        this.prefetch();
        this.setState(this.getState());
    }

    //endregion

    //region render
    render() {
        const { issue } = this.state;

        return <div>
            {issue ? <Issue issue={issue}/> : ''}
        </div>;
    }
    //endregion

    //region Private methods
    prefetch() {
        const { issueId } = this.context.router.getCurrentParams();

        fetchOne(issueId);
    }

    onStoreChange() {
        const state = this.getState();
        this.setState(state);
    }

    getState() {
        const { issueId } = this.context.router.getCurrentParams();
        const issue = issuesStore.getIssues(issueId).first();

        return {
            issue
        };
    }

    setTitle(state) {
        const { issue } = state;

        let title = iget('Issue');

        if (issue) {
            title = issue.get('summary');
        }

        setTitle(title);
    }

    //endregion
}

IssuePage.propTypes = {};
IssuePage.contextTypes = {
    router: PropTypes.func
};
