var React = require('react'),
    { PropTypes } = React,
    actions = require('../../actions/report.actions');

var Fa = require('../fa');


var ReportIssuesTotal = React.createClass({
    propTypes: {
        severity: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        count: PropTypes.number.isRequired,
        short: PropTypes.bool
    },

    onClick: function() {
        if (this.props.count) {
            actions.selectSeverity(this.props.severity);
        }
    },

    render: function() {
        var { count, severity, selected, short } = this.props,
            icon = { hi: 'bomb', medium: 'exclamation-circle', low: 'eye' }[severity],

            cls = {
                'c-report-issues-total': true,
                'c-report-issues-total--disabled': !count,
                'c-report-issues-total--short': short,
                'c-report-issues-total--selected': selected
            };

        cls['c-report-issues-total--' + severity] = true;

        return (
            <div className={React.addons.classSet(cls)} onClick={this.onClick}>
                <h1 className="m-xs">
                    <Fa icon={icon} fw  />
                    {count}
                </h1>
                {this.renderInfo()}
            </div>
        );
    },

    renderInfo: function() {
        if (this.props.short) {
            return (
                <div></div>
            );
        }

        var severity = this.props.severity,
            text = this.getText(severity);

        return (
            <div>
                <h3 className="font-bold no-margins">{text}</h3>
            </div>
        );
    },

    getText: function(severity) {
        return {
            hi: iget('Hi level exploits'),
            medium: iget('Medium warnings'),
            low: iget('Info and notices')
        }[severity];
    }
});

module.exports = ReportIssuesTotal;

if (module.hot) {
    module.hot.accept([
        '../fa'
    ], function() {
        //TODO flux add actions
    });
}
