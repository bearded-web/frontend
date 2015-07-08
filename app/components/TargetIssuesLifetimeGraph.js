/**
 * TargetIssuesLifetimeGraph
 */

import { PropTypes, Component } from 'react';
import { values } from 'lodash';
import { context } from '../lib/nf';
import { fetchIssues } from '../mutators/issueMutators';

import IssuesLifetimeGraph from './IssuesLifetimeGraph';

const cursors = { issues: ['issues'] };

@context({ cursors }, { fetchIssues })
export default class TargetIssuesLifetimeGraph extends Component {
    static propTypes = {
        fetchIssues: PropTypes.func.isRequired,
        issues: PropTypes.object.isRequired,
        targetId: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.fetchIssuesForTarget(this.props.targetId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.targetId !== this.props.targetId) {
            this.fetchIssuesForProject(nextProps.targetId);
        }
    }

    render() {
        const issues = values(this.props.issues)
            .filter(i => i.target === this.props.targetId);

        return <IssuesLifetimeGraph ref="lifetime" issues={issues}/>;
    }


    fetchIssuesForTarget(targetId) {
        if (targetId) {
            this.props.fetchIssues({ target: targetId });
        }
    }
}
