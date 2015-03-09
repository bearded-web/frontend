var {Input, Row, Col} = Bootstrap;

var LeftPanelToggler = require('../left-panel-toggler'),
    AccountControls = require('../account-controls');

let ava = require('../feed-item/derp.png');

var Navbar = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        user: React.PropTypes.object.isRequired
    },

    logOut: function() {
        this.getFlux().actions.app.logOut();
    },


    showNotImplemented: function(e) {
        e.preventDefault();

        this.getFlux().actions.toast.add();
    },

    render: function() {
        var { user } = this.props,
            navStyle = {
                marginBottom: 0
            };

        return (
            <Row className="border-bottom">
                <Col xs={12}>
                    <nav className="navbar navbar-static-top" role="navigation" style={navStyle}>
                        <div className="navbar-header">
                            <span  className="c-navbar--toggler">
                                <LeftPanelToggler />
                            </span>
                            <form role="search" className="navbar-form-custom" onSubmit={this.showNotImplemented}>
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
                                <img alt="image" className="c-navbar--avatar img-circle" src={ava} />
                            </li>
                            <li>
                                <span className="c-navbar--email m-r-sm text-muted welcome-message">Mike Mayers</span>
                            </li>
                            {this.renderMailBadge()}
                            {this.renderNotifyBadge()}
                            <li>
                                <a className="navbar--logout" onClick={this.logOut}>
                                    <i className="fa fa-sign-out"></i>
                                    Log out
                                </a>
                            </li>
                        </ul>
                    </nav>
                </Col>
            </Row>
        );
    },

    renderMailBadge: function() {
        return (
            <li className="dropdown">
                <a onClick={this.showNotImplemented} className="dropdown-toggle count-info" data-toggle="dropdown" href="#" aria-expanded="true">
                    <i className="fa fa-envelope"></i>
                    <span className="label label-warning">16</span>
                </a>
            </li>
        );
    },

    renderNotifyBadge: function() {
        return (
            <li className="dropdown">
                <a onClick={this.showNotImplemented} className="dropdown-toggle count-info" data-toggle="dropdown" href="#" aria-expanded="false">
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
        );
    }
});

module.exports = Navbar;
