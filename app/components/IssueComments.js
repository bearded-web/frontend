import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { create as createStyle } from 'react-style';
import { List } from 'immutable';
import connectToStores from '../lib/connectToStores';
import commentsStore from '../stores/commentsStore';
import issueCommentsStore from '../stores/issuesCommentsStore';
import { fetchIssueComments, addIssueComment } from '../actions/commentsActions';
import { Model } from '../lib/types';
import { listOf } from 'react-immutable-proptypes';
import autobind from '../lib/autobind';

import Fa from './fa';
import CommentForm from './comment-form';
import Comments from './comments';

const S = createStyle({
    loader: {
        fontSize: '3rem',
        textAlign: 'center'
    }
});

function getState({ issueId }) {
    const ids = issueCommentsStore.getComments(issueId);
    const comments = ids ? ids.map(i => commentsStore.getRawState().get(i)) : [];
    return {
        comments: List(comments)
    };
}

@connectToStores([commentsStore, issueCommentsStore], getState)
export default class IssueComment extends Component {
    static propTypes = {
        comments: listOf(Model),
        issueId: PropTypes.string.isRequired
    }
    shouldComponentUpdate = shouldComponentUpdate;

    componentWillMount() {
        this.fetchComments();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.issueId !== nextProps.issueId) {
            this.fetchComments();
        }
    }

    @autobind
    onCommentAdd(text) {
        addIssueComment(this.props.issueId, text);
    }

    render() {
        const { comments } = this.props;

        return <div>
            <CommentForm onNewComment={this.onCommentAdd}/>
            <hr/>
            {comments ? <Comments comments={comments}/> : this.renderLoader()}
        </div>;
    }

    renderLoader() {
        return <div style={S.loader}>
            <Fa icon="refresh" spin/>
        </div>;
    }

    fetchComments() {
        fetchIssueComments(this.props.issueId);
    }
}

