var React = require('react'),
    flux = require('../../flux');

var FeedItem = require('../feed-item');

var Feed = React.createClass({
    mixins: [
        FluxMixin,
        flux.createStoreWatchMixin('FeedStore')
    ],

    _oneFetchLength: 3,
    _fetchInterval: 10000,

    getStateFromFlux: function() {
        return {
            items: flux.store('FeedStore').getTargetFeed(this.props.target.id)
        };
    },

    componentWillMount: function() {
        flux.actions.feed.fetchItems(this.props.target.id, this._oneFetchLength);

        this._fetchIntervalId = setInterval(this._updateFeed, this._fetchInterval);
    },

    componentWillUnmount: function() {
        clearInterval(this._fetchIntervalId);
    },

    componentWillReceiveProps: function(nextProps) {
        var tId = nextProps.target.id;

        if (this.props.target.id !== tId) {
            flux.actions.feed.fetchItems(tId, this._oneFetchLength);
        }
    },

    onShowMoreClick: function() {
        var firstItem = this.state.items[0];

        flux.actions.feed.fetchItems(this.props.target.id, this._oneFetchLength, this.state.items.length);
    },

    render: function() {
        var items = this.state.items;

        return (
            <div>
                <div className="feed-activity-list">
                    {items.map(function(item) {
                        return (
                            <FeedItem key={item.id || item.created} item={item}/>
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

    _updateFeed: function() {
        var lastItem = this.state.items[0],
            tId = this.props.target.id;

        if (lastItem) {
            flux.actions.feed.fetchNewItems(tId, lastItem.updated);
        }
        else {
            flux.actions.feed.fetchItems(tId);
        }
    }
});

module.exports = Feed;


