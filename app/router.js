import Router, { Route, DefaultRoute, NotFoundRoute, Redirect } from 'react-router';
import flux from './flux';
import { captureException } from 'raven-js';

import UserSettingsPage from './components/user-settings-page';
import PasswordResetPage from './components/password-reset-page';
import PasswordResetOkPage from './components/password-reset-ok-page';
import PasswordResetEndPage from './components/password-reset-end-page';
import LoginPage from './components/login-page';
import SignupPage from './components/signup-page';
import TargetCreatePage from './components/target-create-page';
import IssueCreatePage from './components/issue-create-page';
import Agents from './components/agents';
import PlansPage from './components/plans-page';
import PlanPage from './components/plan-page';
import Dashboard from './components/dashboard';
import ReportPage from './components/report-page';
import Scan from './components/scan';
import ScanReport from './components/scan-report';
import Overview from './components/overview';
import NotFound from './components/not-found';
import IssuesPage from './components/IssuesPage';
import IssuePage from './components/issue-page';
import ControlPanelPage from './components/ControlPanelPage';
import Target from './components/target/';
import UsersPage from './components/UsersPage';
import UserPage from './components/UserPage';
import { get as getConfig } from './lib/config';
import TargetTechsPage from './components/TargetTechsPage';

let router = null;

module.exports.get = function getRouter() {
    return router;
};

module.exports.create = function buildRouter() {
    const { signup: { disable = false } } = getConfig();

    const routes = (
        <Route flux={flux}>
            <Route name="password-reset" path="/reset" handler={PasswordResetPage}/>
            <Redirect from="/reset/" to="password-reset"/>

            <Route name="password-reset-ok" path="/reset-ok" handler={PasswordResetOkPage}/>
            <Redirect from="/reset-ok/" to="password-reset-ok"/>

            <Route name="password-reset-end" path="/reset-end" handler={PasswordResetEndPage}/>
            <Redirect from="/reset-end/" to="password-reset-end"/>

            <Route name="login" path="/login" handler={LoginPage}/>
            <Redirect from="/login/" to="login"/>

            {disable || <Route name="signup" path="/signup" handler={SignupPage}/>}
            {disable || <Redirect from="/signup/" to="signup"/>}

            <Route path="/" handler={Dashboard}>
                <DefaultRoute name="overview" handler={Overview}/>

                <Route name="target-create" path="target/new" handler={TargetCreatePage}/>
                <Redirect from="target/new/" to="target-create"/>
                <Route name="target" path="target/:targetId" handler={Target}/>
                <Redirect from="target/" to="target"/>

                <Route name="target-techs" path="target/:targetId/techs" handler={TargetTechsPage}/>
                <Redirect from="target/:targetId/techs/" to="target-techs"/>


                <Route name="new-scan" path="target/:targetId/newScan" handler={Scan}/>
                <Route name="scan-report" path="scan/:scanId" handler={ScanReport}/>
                <Route name="agents" path="agents" handler={Agents}/>

                <Route name="issues" path="issues" handler={IssuesPage}/>
                <Redirect from="issues/" to="issues"/>
                <Route name="issue-create" path="issues/new" handler={IssueCreatePage}/>
                <Redirect from="issues/new/" to="issue-create"/>
                <Route name="issue" path="issues/:issueId" handler={IssuePage}/>
                <Redirect from="issues/:issueId/" to="issue"/>

                <Route name="user-settings" path="settings" handler={UserSettingsPage}/>
                <Redirect from="settings/" to="user-settings"/>

                <Route name="control-panel" path="control-panel" handler={ControlPanelPage}/>
                <Redirect from="control-panel/" to="control-panel"/>

                <Route name="users" path="users" handler={UsersPage}/>
                <Redirect from="users/" to="users"/>
                <Route name="user" path="users/:userId" handler={UserPage}/>
                <Redirect from="users/:userId/" to="user"/>

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
            captureException(error);
            console.error(error);

            throw error;
        }
        //location: Router.HistoryLocation
    });


    return router;
};
