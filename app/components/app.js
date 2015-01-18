var Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    LoginOverlay = require('./login-overlay'),
    Link = Router.Link;

var LeftPanel = require('./left-panel/index'),
    Navbar = require('./navbar/index'),
    AppLoader = require('./app-loader/index'),
    LeftPanelCover = require('./left-panel-cover/index'),
    AddTargetModal = require('./add-target-modal');

var Fluxxor = require('fluxxor');


module.exports = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        createStoreWatchMixin('AppStore', 'TargetsStore')
    ],


    getStateFromFlux: function() {
        return {
            app: this.getFlux().store('AppStore'),
            targets: this.getFlux().store('TargetsStore')
        };
    },

    render: function() {
        var app = this.state.app,
            targetModal,
            leftPanelCover;

        if (!app.inited) {
            return (
                <AppLoader />
            );
        }

        if (!app.isLogedIn) {
            return (
                <LoginOverlay app={this.state.app}/>
            );
        }

        if (this.state.targets.modalIsVisible) {
            targetModal = <AddTargetModal targetsStore={this.state.targets} />;
        }

        if (app.leftPanelVisible) {
            leftPanelCover = <LeftPanelCover flux={this.getFlux()}/>;
        }

        return (
            <div>
                <LeftPanel show={app.leftPanelVisible} targets={this.state.targets} user={app.user}/>
                <div className="page-wrapper gray-bg">
                    <Navbar />
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

