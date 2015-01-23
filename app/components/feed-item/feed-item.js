var React = require('react'),
    moment = require('moment');

var TargetScan = require('../target-scan');

var FeedItem = React.createClass({
    render: function() {
        return this.props.scan ? this.renderScanFeedItem() : this.renderClassyFeedItem();
    },

    renderClassyFeedItem: function() {
        return (
            <div className="c-feed-item feed-element">
                <a href="#" className="pull-left">
                    <img alt="image" className="img-circle" src="http://webapplayers.com/inspinia_admin-v1.8/img/a1.jpg"/>
                </a>
                <div className="media-body ">
                    <small className="pull-right text-navy">1m ago</small>
                    <strong>Sandra Momot</strong>
                started following
                    <strong>Monica Smith</strong>
                    <br/>
                    <small className="text-muted">Today 4:21 pm - 12.06.2014</small>
                    <div className="actions">
                        <a className="btn btn-xs btn-white">
                            <i className="fa fa-thumbs-up"></i>
                        Like </a>
                        <a className="btn btn-xs btn-danger">
                            <i className="fa fa-heart"></i>
                        Love</a>
                    </div>
                </div>
            </div>
        );
    },

    renderScanFeedItem: function() {
        var scan = this.props.scan,
            startedAt = moment(scan.created).calendar();

        return (
            <div className="c-feed-item feed-element">
                <a href="#" className="pull-left">
                    <img alt="image" className="img-circle" src="http://webapplayers.com/inspinia_admin-v1.8/img/a1.jpg"/>
                </a>
                <div className="media-body ">
                    <small className="pull-right text-navy">{startedAt}</small>
                    <strong>You</strong> <span>started scan</span>
                    <br/>
                    <br/>
                    <TargetScan scan={scan}/>
                    <div className="actions">
                        <a className="btn btn-xs btn-white">
                            <i className="fa fa-thumbs-up"></i>
                            Like
                        </a>
                    </div>
                </div>
            </div>
        );

    }
});

module.exports = FeedItem;
