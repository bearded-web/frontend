/**
 * Comments render comments list
 */
import { Component } from 'react/addons';
import { listOf } from 'react-immutable-proptypes';
import { Model, Models } from '../lib/types';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import bindReact from '../lib/autobind.js';
import connectToStores from '../lib/connectToStores';
import usersStore from '../stores/usersStore';

import FeedItem from './f-item';
import Markdown from './markdown';

@connectToStores([usersStore], () => ({ users: usersStore.getRawState() }))
export default class Comments extends Component {
    static propTypes = {
        users: Models,
        comments: listOf(Model)
    }
    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { comments } = this.props;

        return <div className="feed-activity-list">
            {comments.toArray().sort(this.commentsSorter).map(this.renderComment)}
        </div>;
    }

    @bindReact
    renderComment(comment) {
        const { created, owner, text, id } = comment.toObject();
        const actionText = iget('commented');

        const user = this.props.users && this.props.users.get(owner);

        return <FeedItem
            key={id}
            time={created}
            action={actionText}
            $user={user}>
            <Markdown text={text}/>
        </FeedItem>;
    }

    commentsSorter(a, b) {
        const num = str => (new Date(str)).getTime();

        return num(b.get('created')) - num(a.get('created'));
    }
}
