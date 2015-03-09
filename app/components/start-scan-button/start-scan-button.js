var React = require('react'),
    flux = require('../../flux');

var Fa = require('../fa');

var StartScanButton = React.createClass({
    propTypes: {
        target: React.PropTypes.string,
        project: React.PropTypes.string,
        plan: React.PropTypes.string
    },

    createScan: function() {
        var { target, project, plan } = this.props;

        flux.actions.scan.createScan(target, project, plan);
    },

    render: function() {
        return (
            <a onClick={this.createScan}>
                <Fa icon="play" size="2x" fw align="middle"/>
                <span className="c-start-scan-button--text">{iget('Start scan')}</span>
            </a>
        );
    }
});

module.exports = StartScanButton;
