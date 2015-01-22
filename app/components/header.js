var Bootstrap = require('react-bootstrap');

var { Row, Col } = Bootstrap;

var Header = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.arrayOf(React.PropTypes.element)
        ])
    },

    render: function() {
        return (
            <Row className="border-bottom white-bg page-heading">
                {this.props.children}
            </Row>
        );
    }
});

module.exports = Header;
