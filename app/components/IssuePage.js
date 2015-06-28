import { PropTypes, Component } from 'react/addons';
import { fetchIssue } from '../mutators/issueMutators';
import setTitle from '../lib/set-title';
// import autobind from '../lib/autobind';
import { context } from '../lib/nf';
import { fromJS } from 'immutable';
import { Issue as IssueType } from '../lib/types';

import Issue from './issue';

//const cursors = { issues: ['issues'] };
const cursors = props => {
    return {
        issue: ['issues', props.params.issueId]
    };
};

@context({ cursors }, { fetchIssue })
export default class IssuePage extends Component {
    static propTypes = {
        params: PropTypes.shape({
            issueId: PropTypes.string.isRequied
        }).isRequired,
        issue: IssueType,
        fetchIssue: PropTypes.func.isRequired
    };
    //region life cycle
    componentDidMount() {
        this.prefetch();
        this.setTitle(this.props.issue);
    }

    componentWillReceiveProps(newProps) {
        const { issue, params: { issueId } } = this.props;

        if (newProps.params.issueId !== issueId) {
            this.prefetch(issueId);
        }
        if (newProps.issue !== issue) {
            this.setTitle(newProps.issue);
        }
    }

    //endregion

    //region render
    render() {
        const { issue } = this.props;

        return <div>
            {issue ? <Issue ref="issue" issue={fromJS(issue)}/> : ''}
        </div>;
    }
    //endregion

    //region Private methods
    prefetch(issueId) {
        this.props.fetchIssue(issueId || this.props.params.issueId);
    }

    setTitle(issue) {
        let title = iget('Issue');

        if (issue) {
            title = issue.summary;
        }

        setTitle(title);
    }

    //endregion
}
