var React = require('react'),
    flux = require('../../flux');

var FeedItem = require('../feed-item');

var Feed = React.createClass({
    onShowMoreClick: function() {
        flux.actions.toast.add();
    },

    render: function() {
        var scans = this.props.scans;

        return (
            <div>
                <div className="feed-activity-list">
                    {scans.map(function(scan) {
                        return (
                            <FeedItem key={'scan-feed' + scan.id} scan={scan}/>
                        );
                    })}
                </div>

                <button className="btn btn-primary btn-block m" onClick={this.onShowMoreClick}>
                    <i className="fa fa-arrow-down"></i>
                    Show More
                </button>

            </div>
        );
    }
});

module.exports = Feed;


