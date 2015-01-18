var {Grid, Input, Row, Col} = Bootstrap;

var LeftPanelToggler = require('../left-panel-toggler'),
    AccountControls = require('../account-controls');

var Navbar = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        user: React.PropTypes.shape({
            email: React.PropTypes.string.isRequired
        })
    },

    logOut: function() {
        this.getFlux().actions.app.logOut();
    },

    render: function() {
        var navStyle = {
            marginBottom: 0
        };

        return (
            <Grid>
                <Row className="border-bottom">
                    <Col xs={12}>
                        <nav className="navbar navbar-static-top" role="navigation" style={navStyle}>
                            <div className="navbar-header">
                                <span  className="c-navbar--toggler">
                                    <LeftPanelToggler />
                                </span>
                                <form role="search" className="navbar-form-custom" method="post" action="search_results.html">
                                    <div className="form-group">
                                        <Input type="text"
                                            id="top-search"
                                            placeholder={iget('Search for something...')}
                                            ref="search"/>
                                    </div>
                                </form>
                            </div>

                            <ul className="nav navbar-top-links navbar-right">
                                <li>
                                    <span className="m-r-sm text-muted welcome-message">{this.props.user.email}</span>
                                </li>
                                <li className="dropdown open">
                                    <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#" aria-expanded="true">
                                        <i className="fa fa-envelope"></i>
                                        <span className="label label-warning">16</span>
                                    </a>

                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#" aria-expanded="false">
                                        <i className="fa fa-bell"></i>
                                        <span className="label label-primary">8</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-alerts">
                                        <li>
                                            <a href="mailbox.html">
                                                <div>
                                                    <i className="fa fa-envelope fa-fw"></i>
                                                You have 16 messages
                                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <a href="profile.html">
                                                <div>
                                                    <i className="fa fa-twitter fa-fw"></i>
                                                3 New Followers
                                                    <span className="pull-right text-muted small">12 minutes ago</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <a href="grid_options.html">
                                                <div>
                                                    <i className="fa fa-upload fa-fw"></i>
                                                Server Rebooted
                                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <div className="text-center link-block">
                                                <a href="notifications.html">
                                                    <strong>See All Alerts</strong>
                                                    <i className="fa fa-angle-right"></i>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </li>


                                <li>
                                    <a onClick={this.logOut}>
                                        <i className="fa fa-sign-out"></i>
                                        Log out
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = Navbar;
