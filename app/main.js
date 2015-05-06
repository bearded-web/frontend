'use strict';
import 'babel/polyfill';
import './lib/globals';

import { me, onStatus } from './lib/api3.js';
import { dispatch as nDispatch } from './lib/disp';
import { create as createRouter } from './router';
import { last, includes } from 'lodash';
import { lostAuth } from './actions/auth.actions';
import { fetchVulnsCompact } from './actions/vulns.actions';
import { handleMeData } from './actions/app.actions';

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

        React.render(
            <Handler flux={flux} routeQuery={state.query}/>,
            document.getElementById('app')
        );
    });
};
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


if (module.hot) {
    module.hot.accept('./actions', function() {
        //TODO flux add actions
    });
}
