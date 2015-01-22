var React = require('react'),
    Router = require('react-router'),
    AppStore = require('../stores/app.store'),
    RouteHandler = Router.RouteHandler,
    AddTargetModal = require('./add-target-modal'),
    LeftPanel = require('./left-panel'),
    Navbar = require('./navbar'),
    LeftPanelCover = require('./left-panel-cover');

var Dashboard = React.createClass({
    mixins: [FluxMixin],

    statics: {
        willTransitionTo: function(transition) {
            var app = flux.store('AppStore');

            if (!app.isLogedIn && app.inited) {
                console.log('dashbord transit to ligin');
                transition.redirect('/login');
            }
        }
    },

    render: function() {
        var app = this.props.app,
            targets = this.props.targets,
            leftPanelCover,
            targetModal;

        app = this.getFlux().store('AppStore');
        targets = this.getFlux().store('TargetsStore');

        if (app.leftPanelVisible) {
            leftPanelCover = <LeftPanelCover />;
        }

        if (targets.modalIsVisible) {
            targetModal = <AddTargetModal targetsStore={targets} />;
        }


        return (
            <div className="c-dashboard">
                <LeftPanel show={app.leftPanelVisible} targets={targets} user={app.user}/>
                <div className="page-wrapper gray-bg">
                    <div className="container-fluid">
                        <Navbar user={app.user}/>
                    </div>
                    <div className="page-wrapper--content container-fluid">
                        <RouteHandler/>
                    </div>
                </div>
                {leftPanelCover}
                {targetModal}
            </div>
        );
    }
});

module.exports = Dashboard;
