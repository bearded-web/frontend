import UserSettingsPage from './components/user-settings-page';

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
        Redirect = Router.Redirect,
        App = require('./components/app.js'),
        Agents = require('./components/agents'),
        PlansPage = require('./components/plans-page'),
        PlanPage = require('./components/plan-page'),
        Dashboard = require('./components/dashboard'),
        ReportPage = require('./components/report-page'),
        Scan = require('./components/scan'),
        ScanReport = require('./components/scan-report'),
        Overview = require('./components/overview'),
        NotFound = require('./components/not-found'),
        LoginOverlay = require('./components/login-overlay'),
        IssuesPage = require('./components/issues-page'),
        IssuePage = require('./components/issue-page'),
        Target = require('./components/target/');

    var routes = (

        <Route flux={flux} handler={App}>
            <Route handler={Dashboard}>
                <Route name="target" path="target/:targetId" handler={Target}/>
                <Route name="new-scan" path="target/:targetId/newScan" handler={Scan}/>
                <Route name="scan-report" path="scan/:scanId" handler={ScanReport}/>
                <Route name="agents" path="agents" handler={Agents}/>

                <Route name="issues" path="issues" handler={IssuesPage}/>
                <Redirect from="issues/" to="issues"/>
                <Route name="issue" path="issues/:issueId" handler={IssuePage}/>
                <Redirect from="issues/:issueId/" to="issue"/>

                <Route name="user-settings" path="settings" handler={UserSettingsPage}/>
                <Redirect from="settings/" to="user-settings"/>

                <Route name="plans" path="plans" handler={PlansPage}/>
                <Redirect from="plans/" to="plans"/>
                <Route name="plan" path="plans/:planId" handler={PlanPage}/>
                <Redirect from="plans/:planId/" to="plan"/>

                <Route name="report" path="report" handler={ReportPage}/>
                <DefaultRoute name="overview" path="/" handler={Overview}/>

                <NotFoundRoute handler={NotFound}/>
            </Route>
        </Route>
    );

    router = Router.create({
        routes: routes,

        onError(error) {
            console.log(error.stack);

            throw error;
        }
        //location: Router.HistoryLocation
    });


    return router;
};
