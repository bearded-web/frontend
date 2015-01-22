var LoginOverlay = require('./login-overlay'),
    Router = require('react-router'),
    AppLoader = require('./app-loader/index'),
    Dashboard = require('./dashboard');

var Fluxxor = require('fluxxor');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        createStoreWatchMixin('AppStore', 'TargetsStore'),
        Router.State
    ],

    getStateFromFlux: function() {
        return {
            app: this.getFlux().store('AppStore'),
            targets: this.getFlux().store('TargetsStore')
        };
    },

    render: function() {
        if (!this.state.app.inited) {
            return (
                <AppLoader />
            );
        }

        return (
            <RouteHandler />
        );
    }
});

module.exports = App;
