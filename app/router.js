require('react');

var router = null,
    flux = require('./flux');

module.exports.get = function getRouter() {
    return router;
};

module.exports.create = function buildRouter() {

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
                <DefaultRoute name="overview" handler={Overview}/>

                <NotFoundRoute handler={NotFound}/>
            </Route>
        </Route>
    );

    router = Router.create({
        routes: routes
        //location: Router.HistoryLocation
    });

    return router;
};
