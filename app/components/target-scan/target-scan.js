'use strict';

import React, { PropTypes } from 'react/addons';
import moment from 'moment';
import { contains } from 'lodash';
import flux from '../../flux';

import { Row, Col } from 'react-bootstrap';
import TargetStatus from '../target-status';
import Fa from '../fa';
import { Link } from 'react-router';
import ScanSession from '../scan-session';

var TargetScan = React.createClass({
    propTypes: {
        scan: PropTypes.object.isRequired
    },
    contextTypes: {
        router: PropTypes.func
    },

    updateInterval: 2000,


    componentDidMount: function() {
        var isEnded = this.isEnded(this.props.scan);

        if (!isEnded) {

            this.intervalId = setInterval(() => {
                flux.actions.scan.fetchScans(this.props.scan);
            }, this.updateInterval);
        }
    },

    componentWillUnmount: function() {
        clearInterval(this.intervalId);
    },

    componentWillReceiveProps: function(nextProps) {
        var isEnded = this.isEnded(nextProps.scan);

        if (isEnded) {
            clearInterval(this.intervalId);
        }
    },

    render: function() {
        var { scan } = this.props,
            { sessions } = scan,
            isEnded = this.isEnded(scan) || '';

        return (
            <div className="c-target-scan">
                <h4>
                    {scan.plan && scan.plan.name}
                </h4>
                {sessions.map(function(session) {
                    return (
                        <ScanSession key={session.id} session={session}/>
                    );
                })}
                {this.renderLink()}
            </div>
        );
    },

    renderLink: function() {
        var { scan } = this.props,
            isEnded = this.isEnded(scan);

        if (this.isFailed(scan)) {
            return (<div className="c-target-scan--fail">
                <Fa icon="frown-o" fw size="lg"/>
                {iget('Scan failed')}
            </div>);
        }

        return (
            <Link className="c-target-scan--btn btn btn-outline btn-primary btn-xs"
                  to={isEnded ? 'report' : 'scan-report'} params={{ scanId: scan.id }}
                  query={{ scan: scan.id, target: scan.target }}>
                {isEnded ? iget('Show report') : iget('Show progress')}
            </Link>
        );
    },

    isEnded: function(scan) {
        return contains(['finished', 'failed'], scan.status);
    },

    isFailed: function(scan) {
        return scan.status === 'failed';
    }
});

module.exports = TargetScan;
