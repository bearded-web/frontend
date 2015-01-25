var React = require('react');

var Fa = require('../fa');

var StartScanButton = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        text: React.PropTypes.string
    },

    render: function() {
        return (
            <a onClick={this.props.onClick}>
                <Fa icon="play" size="2x" fw align="middle"/>
                <span className="c-start-scan-button--text">{this.props.text || iget('Start detection scanning')}</span>
            </a>
        );
    }
});

module.exports = StartScanButton;
