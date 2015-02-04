var React = require('react');

var { Panel, Accordion } = require('react-bootstrap'),
    PanelHeader = require('../panel-header'),
    Domify = require('react-domify');

var RawReports = React.createClass({
    propTypes: {
        reports: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        return {
            expanded: false
        };
    },

    toggle: function() {
        this.setState({ expanded: !this.state.expanded });
    },

    render: function() {
        if (!this.state.expanded) {
            return (
                <h3>
                    <a onClick={this.toggle}>{iget('Show raw reports info')}</a>
                </h3>
            );
        }

        return (
            <div className="c-raw-reports">
                <h3>
                    <a onClick={this.toggle}>{iget('Hide raw reports info')}</a>
                </h3>
                {this.props.reports.map((report, i) => {
                    return (
                        <Panel>
                            <Domify value={report}/>
                        </Panel>
                    );
                })}
            </div>
        );
    },


    renderPanelHeader: function(sessionId) {
        return 'Header';

        //var scan = this.props.scan,
        //    session,
        //    stepName;
        //
        //if (!scan) {
        //    return '';
        //}
        //
        //session = _.find(scan.sessions, { id: sessionId });
        //stepName = session && session.step.name;
        //
        //return (
        //    <div>
        //        <PanelHeader>
        //        {stepName}
        //        </PanelHeader>
        //    </div>
        //);
    }
});


module.exports = RawReports;

