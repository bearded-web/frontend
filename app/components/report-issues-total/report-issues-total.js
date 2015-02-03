var React = require('react');

var Widget = require('../widget');

var styles = {
    widget: {
        height: '200px'
    }
};

var ReportIssuesTotal = React.createClass({
    propTypes: {
        severity: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired
    },

    render: function() {
        var { count, severity } = this.props,
            text = this.getText(severity),
            desc = this.getDesc(severity),
            bg = this.getBg(severity);

        return (
            <div className="c-report-issues-total">
                <Widget bg={bg} style={styles.widget}>
                    <div className="m-b-md">
                        <i className="fa fa-shield fa-4x"></i>
                        <h1 className="m-xs">{count}</h1>
                        <h3 className="font-bold no-margins">
                            {text}
                        </h3>
                        <small>{desc}</small>
                    </div>
                </Widget>
            </div>
        );
    },

    getBg: function(severity) {
        return {
            hi: 'red',
            medium: 'yellow',
            lo: 'lazur'
        }[severity];
    },

    getText: function(severity) {
        return {
            hi: iget('Hi level exploits'),
            medium: iget('Medium warnings'),
            lo: iget('Info and notices')
        }[severity];
    },

    getDesc: function(severity) {
        return {
             hi: iget('You must fix it as soon as you can. Hackers can damage your site.'),
             medium: iget('This warning show that your site have problems.'),
             lo: iget('Some info you need to know.')
         }[severity];
    }
});

module.exports = ReportIssuesTotal;

if (module.hot) {
    module.hot.accept([
        '../widget'
    ], function() {
        //TODO flux add actions
    });
}
