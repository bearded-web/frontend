var Header = require('./header'),
    { Col } = require('react-bootstrap');

var Overview = React.createClass({
    render: function() {
        return (
            <Header>
                <Col>
                    <h2>Overview</h2>
                </Col>
            </Header>
        );
    }
});

module.exports = Overview;
