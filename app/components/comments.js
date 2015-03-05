'use strict';

import React, { PropTypes, addons } from 'react/addons';
import moment from 'moment';
import { $Model } from '../lib/types';
import { List } from 'immutable';

import Comments from './comments';
import Fa from './fa';
import FeedItem from './f-item';
import Markdown from 'react-markdown-el';

export default React.createClass({
    propTypes: {
        $comments: PropTypes.instanceOf(List)
    },

    render() {
        let comments = this.props.$comments.toArray();

        return <div className="feed-activity-list">
            {comments.map(this.renderComment)}
        </div>
    },

    renderComment($comment, key) {
        let { created, owner, text } = $comment.toObject(),
            actionText = iget('commented');

        return <FeedItem 
            key={key}
            time={created}
            action={actionText}
            $user={owner}>
            <Markdown text={text}/>
        </FeedItem>
    }
});