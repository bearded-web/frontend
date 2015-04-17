'use strict';
var React = require('react'),
    feedActions = require('../../actions/feed.actions'),
    flux = require('../../flux');

var FeedItem = require('../feed-item');

var Feed = React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        type: React.PropTypes.oneOf(['project', 'target'])
    },

    mixins: [
        FluxMixin,
        flux.createStoreWatchMixin('FeedStore')
    ],

    _oneFetchLength: 10,
    _fetchInterval: 3000,

    getStateFromFlux: function() {
        var store = flux.store('FeedStore'),
            { source, type } = this.props,
            items;

        return {
            items: store.getFeedFor(type, source)
        };
    },

    componentDidMount: function() {
        var props = this.props,
            source = this._getSource();

        this._fetchItems();

        this._fetchIntervalId = setInterval(this._updateFeed, this._fetchInterval);
    },

    componentWillUnmount: function() {
        clearInterval(this._fetchIntervalId);
    },

    componentWillReceiveProps: function(nextProps) {
        var source = this._getSource(),
            nextSource = this._getSource(nextProps);

        if ((!source && nextSource) || source && nextSource && source.id !== nextSource.id) {
            this._fetchItems(nextProps);
        }
    },

    onShowMoreClick: function() {
        var type = this._getType(),
            source = this._getSource(),
            skip = this.state.items.length;

        if(source) feedActions.fetchItems(type, source.id, this._oneFetchLength, skip);
    },

    render: function() {
        let { items } = this.state;

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
        var { items } = this.state,
            lastItem = items[items.length - 1],
            type = this._getType(),
            source = this._getSource();

        if (!source) return;

        if (lastItem) {
            feedActions.fetchNewItems(type, source.id, lastItem.updated);
        }
        else {
            feedActions.fetchItems(type, source.id);
        }
    },

    _getType: function(props) {
        props = props || this.props;

        return props.type;
    },

    _getSource: function(props) {
        props = props || this.props;

        return props.source;
    },

    _fetchItems: function(props) {
        props = props || this.props;

        var type = this._getType(props),
            source = this._getSource(props),
            length = this._oneFetchLength;

        if (source) feedActions.fetchItems(type, source.id, length);
    }
});

module.exports = Feed;


