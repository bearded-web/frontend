import React, { PropTypes, addons, Component } from 'react/addons';
import flux, { createStoreWatchMixin } from '../flux';
import { List } from 'immutable';
import { listOf } from 'react-immutable-proptypes';
import { Model } from '../lib/types';
import { fetchTargetComments, addTargetComment } from '../actions/commentsActions';
import autobind from '../lib/autobind';
import connectToStores from '../lib/connectToStores';
import commentsStore from '../stores/commentsStore';
import targetsCommentsStore from '../stores/targetsCommentsStore';

import Comments from './comments';
import CommentForm from './comment-form';

function getState({ target }) {
    const ids = targetsCommentsStore.getComments(target.id);
    const comments = ids ? ids.map(i => commentsStore.getRawState().get(i)) : [];
    return {
        comments: List(comments)
    };
}

@connectToStores([commentsStore, targetsCommentsStore], getState)
export default class TargetComments extends Component {
    static propTypes = {
        comments: listOf(Model),
        target: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    };

    componentWillMount() {
        this.fetchComments();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.target.id !== nextProps.target.id) {
            this.fetchComments();
        }
    }

    @autobind
    onCommentAdd(text) {
        addTargetComment(this.props.target.id, text);
    }

    render() {
        let { comments } = this.props;

        return <div>
            <CommentForm onNewComment={this.onCommentAdd}/>
            <hr/>
            <Comments comments={comments}/>
        </div>;
    }

    fetchComments() {
        fetchTargetComments(this.props.target.id);
    }
}
