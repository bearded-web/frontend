var Bootstrap = require('react-bootstrap');

var { Row, Col } = Bootstrap,
    Header = require('./header'),
    Fa = require('./fa'),
    Widget = require('./widget');

var TargetHeader = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        removeTarget: React.PropTypes.func.isRequired
    },

    render: function() {
        return (
            <Header>
                <Col xs={12} sm={8}>
                    <h2>{this.props.title}</h2>
                </Col>
                <Col sm={4}>
                    <a onClick={this.props.removeTarget}>Delete</a>
                </Col>
            </Header>
        );
    }
});

module.exports = TargetHeader;
