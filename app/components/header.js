var Bootstrap = require('react-bootstrap');

var { Row, Col } = Bootstrap;

var Header = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render: function() {
        return (
            <Row className="border-bottom white-bg page-heading">
                <Col lg={10}>
                    <h2>{this.props.title}</h2>
                </Col>
            </Row>
        );
    }
});

module.exports = Header;
