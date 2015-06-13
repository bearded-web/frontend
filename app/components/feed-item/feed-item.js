
var React = require('react'),
    _ = require('lodash'),
    moment = require('moment');

var { Row, Col, Button } = require('react-bootstrap'),
    TargetScan = require('../target-scan');

var FeedItem = React.createClass({

    propTypes: {
        item: React.PropTypes.object.isRequired
    },

    render() {
        var type = this.props.item.type,
            renderer = this['_render' + _.capitalize(type)] || this._renderUnknown;

        return renderer.call(this);
    },

    _renderScan: function() {
        var item = this.props.item,
            { scan, owner } = item,
            avatar = owner.avatar || this.generateAvatar(owner.email),
            startedAt = moment(scan.created).calendar();

        return (<div className="c-feed-item feed-element">
            <a href="#" className="pull-left">
                <img alt="image" className="img-circle" src={avatar}/>
            </a>
            <div className="media-body ">
                <small className="pull-right text-navy">{startedAt}</small>
                <strong>{owner.nickname}</strong>
                <span>&nbsp;started scan&nbsp;</span>
                <b>{scan.conf.target}</b>
                <br/>
                <br/>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <TargetScan scan={scan}/>
                    </Col>
                </Row>
                <div className="с-feed-item--actions actions" style={{ display: 'none' }}>
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
    },

    generateAvatar: function(identifier = '') {
        var images = [
            require('./megusta.png'),
            require('./no.png'),
            require('./derp.png')
        ];

        return images[identifier.charCodeAt(0) % images.length];
    }
});

module.exports = FeedItem;
