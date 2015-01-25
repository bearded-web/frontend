var Bootstrap = require('react-bootstrap'),
    flux = require('../../flux');

var { Row, Col } = Bootstrap,
    { Link } = require('react-router'),
    Header = require('../header'),
    Fa = require('../fa');

var TargetHeader = React.createClass({
    propTypes: {
        target: React.PropTypes.object.isRequired
    },


    removeTarget: function() {
        flux.actions.target.removeTarget(this.props.target);
    },


    render: function() {
        var target = this.props.target,
            title = target.web.domain;

        return (
            <Header>
                <Col xs={12}>
                    <h2>
                        <span className="c-target-header--title">
                            {title}
                        </span>
                        <small className="pull-right c-target-header--controls">
                            <Link
                                to="new-scan"
                                params={{ targetId: target.id }}
                                query={{ project: target.project }}>
                                <Fa icon="plus" fw/>
                            Create scan
                            </Link>
                            <span>&nbsp;</span>
                            <a onClick={this.removeTarget}>
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
