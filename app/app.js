var Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    LoginOverlay = require('./components/login-overlay'),
    Link = Router.Link;

var LeftPanel = require('./components/left-panel'),
    Navbar = require('./components/navbar'),
    LeftPanelCover = require('./components/left-panel-cover'),
    AddTargetModal = require('./components/add-target-modal');

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
        var targetModal,
            leftPanelCover;

        if (!this.state.app.isLogedIn) {
            return (
                <LoginOverlay app={this.state.app}/>
            );
        }

        if (this.state.targets.modalIsVisible) {
            targetModal = <AddTargetModal targetsStore={this.state.targets} />;
        }

        if (this.state.app.leftPanelVisible) {
            leftPanelCover = <LeftPanelCover flux={this.getFlux()}/>
        }

        return (
            <div>
                <LeftPanel show={this.state.app.leftPanelVisible} targets={this.state.targets} user={this.state.app.user}/>
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

