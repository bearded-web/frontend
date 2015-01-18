require('react');

var router = null;

module.exports.get = function getRouter() {
    return router;
};

module.exports.create = function buildRouter(flux) {

    var Router = require('react-router'),
        Route = Router.Route,
        DefaultRoute = Router.DefaultRoute,
        NotFoundRoute = Router.NotFoundRoute,
        App = require('./components/app.js'),
        Dashboard = require('./components/dashboard'),
        Page = require('./components/page'),
        Overview = require('./components/overview'),
        NotFound = require('./components/not-found'),
        LoginOverlay = require('./components/login-overlay'),
        Target = require('./components/target/');

    var routes = (

        <Route flux={flux} handler={App}>
            <Route handler={Dashboard}>
                <Route name="target" path="target/:targetId" handler={Target}/>
                <DefaultRoute handler={Overview}/>
            </Route>

            <Route handler={Page}>
                <Route name="signup" path="/signup/?" handler={LoginOverlay}/>
                <Route name="login" path="/login/?" handler={LoginOverlay}/>
            </Route>


            <NotFoundRoute handler={NotFound}/>
        </Route>
    );

    router = Router.create({
        routes: routes
        //location: Router.HistoryLocation
    });

    return router;
};
