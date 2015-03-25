import React, { PropTypes, addons } from 'react/addons';
import flux, { createStoreWatchMixin } from '../flux';

import Comments from './comments';
import CommentForm from './comment-form'

export default React.createClass({
    mixins: [
        FluxMixin,
        createStoreWatchMixin('TargetStore')
    ],

    propTypes: {
        target: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    },

    getStateFromFlux() {
        return {
            $comments: flux.store('TargetStore').getState().$comments 
        };
    },

    componentWillMount() {
        this.fetchComments();
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.target.id !== nextProps.target.id) {
            this.fetchComments();
        }
    },

    onCommentAdd(text) {
        flux.actions.target.addComment(this.props.target, text);
    },

    render() {
        let { $comments } = this.state;

        return <div>
            <CommentForm onNewComment={this.onCommentAdd}/>
            <hr/>
            <Comments $comments={$comments}/>
        </div>;
    },

    fetchComments() {
        flux.actions.target.fetchComments(this.props.target);
    }
});
