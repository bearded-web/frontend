'use strict';
import UserSettingsPage from './components/user-settings-page';
import PasswordResetPage from './components/password-reset-page';
import PasswordResetOkPage from './components/password-reset-ok-page';
import PasswordResetEndPage from './components/password-reset-end-page';
import LoginPage from './components/login-page';
import SignupPage from './components/signup-page';

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
        <Route flux={flux}>
            <Route name="password-reset" path="/reset" handler={PasswordResetPage}/>
            <Redirect from="/reset/" to="password-reset"/>

            <Route name="password-reset-ok" path="/reset-ok" handler={PasswordResetOkPage}/>
            <Redirect from="/reset-ok/" to="password-reset-ok"/>

            <Route name="password-reset-end" path="/reset-end" handler={PasswordResetEndPage}/>
            <Redirect from="/reset-end/" to="password-reset-end"/>

            <Route name="login" path="/login" handler={LoginPage}/>
            <Redirect from="/login/" to="login"/>

            <Route name="signup" path="/signup" handler={SignupPage}/>
            <Redirect from="/signup/" to="signup"/>

            <Route path="/" handler={Dashboard}>
                <DefaultRoute name="overview" handler={Overview}/>

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
            </Route>

            <NotFoundRoute handler={NotFound}/>
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
