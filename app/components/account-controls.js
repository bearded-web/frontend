'use strict';
import { Grid, Row, Button, Col } from 'react-bootstrap';

module.exports = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        email: React.PropTypes.string.isRequired
    },

    logOut: function() {
        this.getFlux().actions.app.logOut();
    },

    render: function() {
        return (
            <Grid fluid >
                <Row>
                    <Col xs={12}>
                        <label>{this.props.email}&nbsp;</label>
                        <Button onClick={this.logOut} bsStyle="primary" bsSize="xsmall">Log out</Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
});
