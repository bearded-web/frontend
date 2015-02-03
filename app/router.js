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
        Agents = require('./components/agents'),
        Dashboard = require('./components/dashboard'),
        Page = require('./components/page'),
        ReportPage = require('./components/report-page'),
        Scan = require('./components/scan'),
        ScanReport = require('./components/scan-report'),
        Overview = require('./components/overview'),
        NotFound = require('./components/not-found'),
        LoginOverlay = require('./components/login-overlay'),
        Target = require('./components/target/');

    var routes = (

        <Route flux={flux} handler={App}>
            <Route handler={Dashboard}>
                <Route name="target" path="target/:targetId" handler={Target}/>
                <Route name="new-scan" path="target/:targetId/newScan" handler={Scan}/>
                <Route name="scan-report" path="scan/:scanId" handler={ScanReport}/>
                <Route name="agents" path="agents" handler={Agents}/>
                <Route name="report" path="report" handler={ReportPage}/>
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
