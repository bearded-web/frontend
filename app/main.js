import 'babel/polyfill';
import './lib/globals';
import { init as initAnalytics } from './lib/ga';
import api, { me, onStatus, config } from './lib/api3.js';
import { create as createRouter } from './router';
import { last, includes } from 'lodash';
import { lostAuth } from './actions/auth.actions';
import { fetchVulnsCompact } from './actions/vulnsActions';
import { handleMeData } from './actions/app.actions';
import { handleMeData as handleMe } from './mutators/appMutators';
import Raven from 'raven-js';
import { set as setConfig } from './lib/config';
import Baobab from 'baobab';
import dataTree, { facets } from './lib/dataTree';
import { setCurrentProject } from './mutators/projectsMutators';
import { fetchPlans } from './mutators/planMutators';

const dispatch = require('./lib/dispatcher').dispatch;
const C = require('./constants');

require('bootstrap/less/bootstrap.less');
require('font-awesome-webpack');

require('./styles/fonts.less');
require('./styles/inspina/style.less');
require('./styles/dashboard.less');
require('./styles/transitions.less');


const flux = window.flux = require('./flux');

const tree = new Baobab(dataTree, { facets });

/* eslint-disable */
if ('production' !== process.env.NODE_ENV) {
    window.assert = console.assert.bind(console);
    tree.on('update', function(e) {
        console.log('[Tree update] Update log', e.data.log);
        console.log('[Tree update] Previous data', e.data.previousData);
    });
}
/* eslint-enable */

const startRouting = (isAnonym) => {
    const router = createRouter();

    router.run(function(Handler, state) {
        if (isAnonym) {
            const { name } = last(state.routes);

            if (!includes(['signup', 'password-reset-ok', 'password-reset', 'password-reset-end'], name)) {
                router.transitionTo('login');
            }
        }

        ga('send', 'pageview', state.path);

        React.render(
            <Handler
                api={api}
                tree={tree}
                flux={flux}
                routeQuery={state.query}/>,
            document.getElementById('app')
        );
    });
};

config.get()
    .then(config => {
        setConfig(config);

        const { raven = {} } = config;
        if (raven.enable) {
            Raven.config(raven.address).install();
        }

        if (config.ga.enable) {
            initAnalytics();
            ga('create', config.ga.id, 'auto');
        }
        else {
            window.ga = function() {
            };
        }

        const plans = flux.actions.plan.fetchPlans();
        fetchPlans({ tree, api });
        me.info()
            .then(data => {
                onStatus(401, lostAuth);

                dispatch(C.APP_LIFT_SUCCESS);
                handleMeData(data);
                handleMe({ tree }, data);

                fetchVulnsCompact();
                setCurrentProject({ tree, api }, tree.select('currentProjectId').get());

                return plans;
            })
            .then(() => startRouting())
            .catch(() => {
                dispatch(C.APP_LIFT_SUCCESS);

                startRouting(true);
            });
    })
    .catch(() => {
        /* eslint-disable */
        alert(iget('Application config not loaded. Please notify us with help@barbudo.net'));
        /* eslint-enable */
    });


if (module.hot) {
    module.hot.accept('./actions', function() {
        //TODO flux add actions
    });
}
