'use strict';

var React = require('react'),
    moment = require('moment'),
    _ = require('lodash'),
    flux = require('../../flux');

import { Row, Col } from 'react-bootstrap';
import FakeTechs from '../fake-techs';
import TargetStatus from '../target-status';

var Fa = require('../fa'),
    { Link } = require('react-router'),
    ScanSession = require('../scan-session');

var TargetScan = React.createClass({
    propTypes: {
        scan: React.PropTypes.object.isRequired
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
                        <ScanSession key={session.id} session={session} />
                    );
                })}
                {this.renderLink()}
                {this.renderFakeIssues()}
                {this.renderFakeTechs()}
            </div>
        );
    },

    renderFakeIssues() {
        let { scan } = this.props,
            finished = scan.status === 'finished',
            isVisible = scan.sessions[0].step.name === 'Detect wordpress' && finished,
            style = {
                marginTop: '14px'
            };

        if (!isVisible) return '';

        return <div>
            <br/>
            <h4>Issues</h4>
            <TargetStatus
                high={1}
                medium={3}
                low={0}/>
        </div>
    },

    renderFakeTechs() {
        let { scan } = this.props,
            finished = scan.status === 'finished',
            isVisible = scan.sessions[0].step.name === 'Detect technologies' && finished;

        if (!isVisible) return '';

        return <FakeTechs/>
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
            <Link className="c-target-scan--btn btn btn-outline btn-primary btn-xs" to={isEnded ? 'report' : 'scan-report'} params={{ scanId: scan.id }} query={{ scan: scan.id, target: scan.target }}>
                {isEnded ? iget('Show report') : iget('Show progress')}
            </Link>
        );
    },

    isEnded: function(scan) {
        return _.contains(['finished', 'failed'], scan.status);
    },

    isFailed: function(scan) {
        return scan.status === 'failed';
    }
});

module.exports = TargetScan;
