import { PropTypes, Component } from 'react';
import { context } from '../lib/nf';
import { Target, Project } from '../lib/types';
import { fetchFeed, fetchMoreFeedItems, fetchNewFeedItems } from '../mutators/feedMutators';
import autobind from '../lib/autobind';

import FeedItem from './FeedFlowItem';
import { Button } from 'react-bootstrap';

//TODO change to func form props
const cursors = {
    feedItems: ['feedItems'],
    projectsFeeds: ['projectsFeeds'],
    targetsFeeds: ['targetsFeeds'],
    targetsFeedsCounts: ['targetsFeedsCounts'],
    projectsFeedsCounts: ['projectsFeedsCounts']
};

@context({ cursors }, { fetchFeed, fetchMoreFeedItems, fetchNewFeedItems })
export default class FeedFlow extends Component {
    static propTypes = {
        source: PropTypes.oneOfType([Target, Project]).isRequired,
        type: PropTypes.oneOf(['target', 'project']),
        feedItems: PropTypes.object.isRequired,
        projectsFeeds: PropTypes.object.isRequired,
        targetsFeeds: PropTypes.object.isRequired,
        projectsFeedsCounts: PropTypes.object.isRequired,
        targetsFeedsCounts: PropTypes.object.isRequired,
        fetchFeed: PropTypes.func.isRequired,
        fetchNewFeedItems: PropTypes.func.isRequired,
        fetchMoreFeedItems: PropTypes.func.isRequired
    };
    componentWillMount() {
        this.props.fetchFeed({
            type: this.props.type,
            source: this.props.source
        });
    }
    componentDidMount() {
        this.updateIntervalId = setInterval(() => {
            this.props.fetchNewFeedItems({
                type: this.props.type,
                source: this.props.source
            });
        }, 5000);
    }
    componentWillUnmount() {
        clearInterval(this.updateIntervalId);
    }

    @autobind
    showMore() {
        this.props.fetchMoreFeedItems({
            type: this.props.type,
            source: this.props.source
        });
    }
    render() {
        const {
            type,
            feedItems,
            projectsFeeds,
            targetsFeeds,
            targetsFeedsCounts,
            projectsFeedsCounts,
            source: { id }
        } = this.props;
        const store = type === 'project' ? projectsFeeds : targetsFeeds;
        const ids = store[id];
        const items = ids ? ids.map(i => feedItems[i]) : [];
        const count = (type === 'project' ? projectsFeedsCounts : targetsFeedsCounts)[id];
        const showBtn = count > items.length;

        return <div>
            <div refCollection="items">
                {items.map(this.renderItem)}
            </div>

            {showBtn && <Button ref="more" block bsStyle="success" onClick={this.showMore}>
                {iget('Show more items')}
            </Button>}
        </div>;
    }

    renderItem(item) {
        return <FeedItem item={item} key={item.id}/>;
    }
}
