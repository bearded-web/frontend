import Router, { Route, DefaultRoute, NotFoundRoute, Redirect, HashLocation } from 'react-router';
import flux from './flux';
import { captureException } from './lib/raven';

import UserSettingsPage from './components/user-settings-page';
import PasswordResetPage from './components/password-reset-page';
import PasswordResetOkPage from './components/password-reset-ok-page';
import PasswordResetEndPage from './components/password-reset-end-page';
import LoginPage from './components/login-page';
import SignupPage from './components/signup-page';
import TargetCreatePage from './components/target-create-page';
import IssueCreatePage from './components/issue-create-page';
import AgentsPage from './components/AgentsPage';
import PlansPage from './components/PlansPage';
import PlanPage from './components/plan-page';
import Dashboard from './components/dashboard';
import ReportPage from './components/ReportPage';
import Scan from './components/NewScanPage';
import ScanPage from './components/ScanPage';
import NotFound from './components/not-found';
import IssuesPage from './components/IssuesPage';
import IssuePage from './components/IssuePage';
import ControlPanelPage from './components/ControlPanelPage';
import Target from './components/target/';
import UsersPage from './components/UsersPage';
import UserPage from './components/UserPage';
import { get as getConfig } from './lib/config';
import TargetTechsPage from './components/TargetTechsPage';
import ProjectPage from './components/ProjectPage';
import ProjectsPage from './components/ProjectsPage';
import SystemOverview from './components/SystemOverview';
import TargetsPage from './components/TargetsPage';
import App from './components/App';

let router = null;

module.exports.get = function getRouter() {
    return router;
};

module.exports.create = function buildRouter() {
    const { signup: { disable = false } } = getConfig();

    const routes = (
        <Route flux={flux} handler={App}>
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

            <Route name="overview" path="/" handler={Dashboard}>

                <Route name="target-create" path="target/new" handler={TargetCreatePage}/>
                <Redirect from="target/new/" to="target-create"/>
                <Route name="target" path="target/:targetId" handler={Target}/>
                <Redirect from="target/" to="target"/>

                <Route name="target-techs" path="target/:targetId/techs" handler={TargetTechsPage}/>
                <Redirect from="target/:targetId/techs/" to="target-techs"/>


                <Route name="new-scan" path="target/:targetId/newScan" handler={Scan}/>
                <Route name="scan-report" path="scan/:scanId" handler={ScanPage}/>


                <Route name="issues" path="issues" handler={IssuesPage}/>
                <Redirect from="issues/" to="issues"/>
                <Route name="issue-create" path="issues/new" handler={IssueCreatePage}/>
                <Redirect from="issues/new/" to="issue-create"/>
                <Route name="issue" path="issues/:issueId" handler={IssuePage}/>
                <Redirect from="issues/:issueId/" to="issue"/>

                <Route name="user-settings" path="settings" handler={UserSettingsPage}/>
                <Redirect from="settings/" to="user-settings"/>

                <Route name="control-panel" path="c" handler={ControlPanelPage}>
                    <Route name="users" path="users" handler={UsersPage}/>
                    <Redirect from="users/" to="users"/>
                    <Route name="user" path="users/:userId" handler={UserPage}/>
                    <Redirect from="users/:userId/" to="user"/>

                    <Route name="plans" path="plans" handler={PlansPage}/>
                    <Redirect from="plans/" to="plans"/>
                    <Route name="plan" path="plans/:planId" handler={PlanPage}/>
                    <Redirect from="plans/:planId/" to="plan"/>

                    <Route name="agents" path="agents" handler={AgentsPage}/>
                    <Redirect from="agents/" to="agents"/>

                    <Route name="projects" path="projects" handler={ProjectsPage}/>
                    <Redirect from="projects/" to="projects"/>

                    <Route name="targets" path="targets" handler={TargetsPage}/>
                    <Redirect from="targets/" to="targets"/>

                    <DefaultRoute handler={SystemOverview}/>
                </Route>
                <Redirect from="control-panel/" to="control-panel"/>

                <Route name="report" path="report" handler={ReportPage}/>
                <DefaultRoute handler={ProjectPage}/>
            </Route>

            <NotFoundRoute handler={NotFound}/>
        </Route>
    );

    router = Router.create({
        routes: routes,

        location: HashLocation,

        onError(error) {
            captureException(error);
            throw error;
        }
    });


    return router;
};
