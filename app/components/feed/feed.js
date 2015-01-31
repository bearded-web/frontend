var React = require('react'),
    flux = require('../../flux');

var FeedItem = require('../feed-item');

var Feed = React.createClass({
    mixins: [
        FluxMixin,
        flux.createStoreWatchMixin('FeedStore')
    ],

    getStateFromFlux: function() {
        return {
            items: flux.store('FeedStore').getTargetFeed(this.props.target.id)
        };
    },

    componentDidMount: function() {
        this.fetchFeed(this.props.target.id);
    },

    componentWillReceiveProps: function(nextProps) {
        var tId = nextProps.target.id;

        if (this.props.target.id !== tId)
            this.fetchFeed(tId);
    },

    render: function() {
        var items = this.state.items;

        return (
            <div>
                <div className="feed-activity-list">
                    {items.map(function(item) {
                        return (
                            <FeedItem key={item.id} item={item}/>
                        );
                    })}
                </div>

                <button className="btn btn-primary btn-block m" onClick={this.onShowMoreClick}>
                    <i className="fa fa-arrow-down"></i>
                    Show More
                </button>

            </div>
        );
    },

    fetchFeed: function(tid) {
        flux.actions.feed.fetchFeedForTarget(tid);
    }
});

module.exports = Feed;


