'use strict';

import { createClass } from 'react/addons';
import { fromJS } from 'immutable';
import flux from '../../flux';
import { State } from 'react-router';
import { assign } from 'lodash';
import setTitle from '../../lib/set-title';


import Ibox, { IboxContent } from '../ibox';
import { Row, Col, Input } from 'react-bootstrap';
import Plans from '../plans-with-search';

var Scan = createClass({
    mixins: [
        State,
        FluxMixin,
        createStoreWatchMixin('PlansStore')
    ],

    componentDidMount() {
        setTitle(iget('New scan'));
    },

    getStateFromFlux: function() {
        let state = {};

        state.$plans = flux.store('PlansStore').getPlans();

        return state;
    },

    onStartScan($plan) {
        flux.actions.scan.createScan(
            this.getParams().targetId,
            this.getQuery().project,
            $plan.get('id'));
    },


    render: function() {
        var { $plans, search } = this.state;

        return <div className="c-scan">
            <Plans plans={$plans} onStartScan={this.onStartScan}/>
        </div>;
    }
});

module.exports = Scan;
