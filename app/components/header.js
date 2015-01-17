var Row = Bootstrap.Row,
    Col = Bootstrap.Col;

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
