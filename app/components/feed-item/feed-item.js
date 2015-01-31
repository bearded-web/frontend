var React = require('react'),
    _ = require('lodash'),
    moment = require('moment');

var { Row, Col, Button } = require('react-bootstrap'),
    TargetScan = require('../target-scan');

var FeedItem = React.createClass({
    render: function() {
        var type = this.props.item.type,
            renderer = this['_render' + _.capitalize(type)] || this._renderUnknown;

        return renderer.call(this);
    },

    _renderScan: function() {
        var scan = this.props.item.scan,
            startedAt = moment(scan.created).calendar();

        return (<div className="c-feed-item feed-element">
            <a href="#" className="pull-left">
                <img alt="image" className="img-circle" />
            </a>
            <div className="media-body ">
                <small className="pull-right text-navy">{startedAt}</small>
                <strong>You&nbsp;</strong>
                <span>started scan&nbsp;</span>
                <b>{scan.conf.target}</b>
                <br/>
                <br/>
                <Row>
                    <Col sm={6} md={12} lg={6}>
                        <TargetScan scan={scan}/>
                    </Col>
                </Row>
                <div className="с-feed-item--actions actions"  style={{ display: 'none' }}>
                    <a href>{iget('Comments')}</a>

                    <div className="c-feed-item--loves">
                        <a className="btn btn-xs btn-white ">
                            <i className="fa fa-thumbs-up"></i>
                            Like
                        </a>
                    </div>
                </div>
            </div>
        </div>);
    },

    _renderUnknown: function() {
        return (
            <div>Unknown type {this.props.item.type}</div>
        );
    }
});

module.exports = FeedItem;
