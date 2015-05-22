/**
 * IssuesList
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { listOf } from 'react-immutable-proptypes';
import autobind from '../lib/autobind';
import { create as createStyle } from 'react-style';
import moment from 'moment';

import { Table } from 'react-bootstrap';
import IssueListItemsControls from './IssueListItemsControls';
import SeverityIcon from './severity-icon';
import { Link } from 'react-router';

const S = createStyle({
    summaryTable: {
        width: '100%',
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        border: 0
    },
    summary: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    controls: {
        whiteSpace: 'nowrap',
        width: '6rem'
    }
});

export default class IssuesList extends Component {
    static propTypes = {
        issues: listOf(Model)
    };
    static contextTypes = {
        router: PropTypes.func
    };

    shouldComponentUpdate = shouldComponentUpdate;

    onIssueClick(issue) {
        this.context.router.transitionTo('issue', {
            issueId: issue.get('id')
        });
    }

    render() {
        const { issues } = this.props;

        if (!issues) return <h1 className="text-center">Loading</h1>;

        return <Table striped>
            <thead>
            <tr>
                <th></th>
                <th style={S.summary}>Summary</th>
                <th>Updated</th>
                <th style={S.controls}>Controls</th>
            </tr>
            </thead>
            <tbody>
            {issues.toArray().map(this.renderIssue)}
            </tbody>
        </Table>;
    }

    @autobind
    renderIssue(issue) {
        const { id, summary, severity, updated } = issue.toObject();
        const updatedString = moment(updated).format('DD.MM.YYYY');

        return <tr key={id}>
            <td><SeverityIcon severity={severity} size={16}/></td>
            <td>
                <table style={S.summaryTable}>
                    <tr>
                        <td style={S.summary}>
                            <Link to="issue" params={{issueId: id}}>
                                {summary}
                            </Link>
                        </td>
                    </tr>
                </table>
            </td>
            <td>{updatedString}</td>
            <td style={S.controls}>
                <IssueListItemsControls issue={issue}/>
            </td>
        </tr>;
    }
}

