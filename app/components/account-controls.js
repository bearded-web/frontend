var Grid = Bootstrap.Grid,
    Row = Bootstrap.Row,
    Button = Bootstrap.Button,
    Col = Bootstrap.Col;

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
