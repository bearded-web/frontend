var Bootstrap = require('react-bootstrap');

var { Row, Col } = Bootstrap,
    Header = require('../header'),
    Fa = require('../fa');

var TargetHeader = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        removeTarget: React.PropTypes.func.isRequired
    },

    render: function() {
        return (
            <Header>
                <Col xs={12}>
                    <h2>
                        <span className="c-target-header--title">
                            {this.props.title}
                        </span>
                        <small className="pull-right c-target-header--controls">
                            <a onClick={this.props.removeTarget}>
                                <Fa icon="remove" fw/>
                                Delete
                            </a>
                        </small>
                    </h2>
                </Col>
            </Header>
        );
    }
});

module.exports = TargetHeader;
