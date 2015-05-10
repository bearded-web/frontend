import 'babel/polyfill';
import './lib/globals';
import { init as initAnalytics } from './lib/ga';

import { me, onStatus, config } from './lib/api3.js';
import { dispatch as nDispatch } from './lib/disp';
import { create as createRouter } from './router';
import { last, includes } from 'lodash';
import { lostAuth } from './actions/auth.actions';
import { fetchVulnsCompact } from './actions/vulns.actions';
import { handleMeData } from './actions/app.actions';
import Raven from 'raven-js';

const dispatch = require('./lib/dispatcher').dispatch;
const C = require('./constants');

require('bootstrap/less/bootstrap.less');
require('font-awesome-webpack');

require('./styles/fonts.less');
require('./styles/inspina/style.less');
require('./styles/dashboard.less');
require('./styles/transitions.less');


var flux = window.flux = require('./flux');

const router = createRouter();
const plans = flux.actions.plan.fetchPlans();
const startRouting = (isAnonym) => {
    router.run(function(Handler, state) {
        if (isAnonym) {
            const { name } = last(state.routes);

            if (!includes(['signup', 'password-reset-ok', 'password-reset', 'password-reset-end'], name)) {
                router.transitionTo('login');
            }
        }

        ga('send', 'pageview', state.path);

        React.render(
            <Handler flux={flux} routeQuery={state.query}/>,
            document.getElementById('app')
        );
    });
};

config.get()
    .then(config => {
        const { raven = {} } = config;
        if (raven.enable) {
            Raven.config(raven.address).install();
        }

        if (config.ga.enable) {
            initAnalytics();
            ga('create', config.ga.id, 'auto');
        }
        else {
            window.ga = function() {};
        }

        me.info()
            .then(data => {
                onStatus(401, lostAuth);

                dispatch(C.APP_LIFT_SUCCESS);
                handleMeData(data);

                fetchVulnsCompact();

                return plans;
            })
            .then(() => startRouting())
            .catch(() => {
                dispatch(C.APP_LIFT_SUCCESS);

                startRouting(true);
            });
    })
    .catch(() => {
        alert(iget('Application config not loaded. Please notify us with help@barbudo.net'));
    });


if (module.hot) {
    module.hot.accept('./actions', function() {
        //TODO flux add actions
    });
}
