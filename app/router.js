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
        App = require('./app.js'),
        Overview = require('./components/overview'),
        NotFound = require('./components/not-found'),
        Target = require('./components/target/');

    var routes = (
        <Route flux={flux} name="app" path="/" handler={App}>
            <DefaultRoute handler={Overview}/>

            <Route name="target" path="target/:targetId" handler={Target}/>

            <NotFoundRoute handler={NotFound}/>
        </Route>
    );

    return router = Router.create({
        routes: routes
        //location: Router.HistoryLocation
    });
};
