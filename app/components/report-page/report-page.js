var React = require('react'),
    { State, Navigation } = require('react-router'),
    reportActions = require('../../actions/report.actions');

var ReportIssues = require('../report-issues'),
    ReportTechs = require('../report-techs'),
    RawReports = require('../raw-reports');

var ReportPage = React.createClass({
    mixins: [
        FluxMixin,
        Navigation,
        State,
        createStoreWatchMixin('ReportStore')
    ],

    statics: {
        willTransitionTo: function(transition, params, query) {
            var { scan } = query;

            reportActions.fetchScanReports(scan);
        }
    },

    getStateFromFlux: function() {
        var { scan } = this.getQuery(),
            state = flux.store('ReportStore').getState();

        state.reports = flux.store('ReportStore').getScanReports(scan);

        return state;
    },


    render: function() {
        var { reports, severity } = this.state;

        return (
            <div className="c-report-page">
                <ReportIssues reports={reports} severity={severity}/>
                <ReportTechs reports={reports}/>
                <RawReports reports={reports}  />
            </div>
        );
    }
});

module.exports = ReportPage;

if (module.hot) {
    module.hot.accept([
        '../raw-reports',
        '../report-issues',
        '../report-techs'
    ], function() {
        //TODO flux add actions
    });
}
