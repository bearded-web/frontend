var React = require('react'),
    moment = require('moment'),
    _ = require('lodash'),
    flux = require('../../flux');

var Fa = require('../fa'),
    { Link } = require('react-router'),
    ScanSession = require('../scan-session');

var TargetScan = React.createClass({
    propTypes: {
        scan: React.PropTypes.object.isRequired
    },

    updateInterval: 2000,


    componentDidMount: function() {
        this.intervalId = setInterval(() => {
            flux.actions.scan.fetchScans(this.props.scan);
        }, this.updateInterval);
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
            isEnded = this.isEnded(scan);

        return (
            <div className="c-target-scan">
                {scan.sessions.map(function(session) {
                    return (
                        <ScanSession key={session.id} session={session} />
                    );
                })}

                <Link className="c-target-scan--btn btn btn-outline btn-primary btn-xs" to="scan-report" params={{ scanId: scan.id }}>
                    {isEnded ? iget('Show report') : iget('Show process')}
                </Link>
            </div>
        );
    },

    isEnded: function(scan) {
        return _.contains(['finished', 'error'], scan.status);
    }
});

module.exports = TargetScan;
