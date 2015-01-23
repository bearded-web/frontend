var React = require('react'),
    _ = require('lodash'),
    flux = require('../../flux');

var Fa = require('../fa'),
    moment = require('moment'),
    ScanSession = require('../scan-session');

var TargetScan = React.createClass({
    propTypes: {
        scan: React.PropTypes.object.isRequired
    },

    updateInterval: 3000,

    componentDidMount: function() {
        this.intervalId = setInterval(() => {
            flux.actions.scan.fetchScans(this.props.scan);
        }, this.updateInterval);
    },

    componentWillUnmount: function() {
        clearInterval(this.intervalId)
    },

    componentWillReceiveProps: function(nextProps) {
        var isEnded = _.contains(['finished', 'error'], nextProps.scan.status);

        if (isEnded) {
            clearInterval(this.intervalId)
        }
    },

    render: function() {
        var { scan } = this.props;

        return (
            <div className="target-scan">
                {scan.sessions.map(function(session) {
                    return (
                        <ScanSession key={session.id} session={session} />
                    );
                })}
            </div>
        );
    }
});

module.exports = TargetScan;
