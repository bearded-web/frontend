import { Component, PropTypes } from 'react';
import { context } from '../lib/nf';
import { clone } from 'lodash';
import { FeedItem as FeedItemType } from '../lib/types';
import { create as createStyle } from 'react-style';

import FeedItem from './feed-item';

const S = createStyle({
    item: {
        margin: '1rem 0 1.5rem 0',
        borderBottom: '1px solid #E7EAEC'
    }
});
//TODO use cursor from parent instead global users cursor
const cursors = { users: ['users'] };

@context({ cursors })
export default class FeedFlowItem extends Component {
    static propTypes = {
        users: PropTypes.object.isRequired,
        item: FeedItemType
    };

    render() {
        const users = this.props.users;
        const item = clone(this.props.item);
        item.owner = users[item.owner];
        return <div style={S.item}>
            <FeedItem
                item={item}
                ref="item"/>
        </div>;
    }
}
