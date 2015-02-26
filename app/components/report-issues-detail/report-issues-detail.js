var React = require('react'),
    _ = require('lodash');

var { Row, Col, Table, Panel, Accordion } = require('react-bootstrap'),
    PanelHeader = require('../panel-header');

var ReportIssuesDetail = React.createClass({
    propTypes: {
        issues: React.PropTypes.array.isRequired
    },

    render: function() {
        var { issues } = this.props;

        return (
            <div>
                <Accordion>
                {issues.map((issue, i) => {
                    return (
                        <Panel key={i} header={this.renderPanelHeader(issue)} eventKey={i + 1}>
                            {this.renderDetail(issue)}
                        </Panel>
                    );
                })}
                </Accordion>
            </div>
        );
    },

    renderPanelHeader: function(issue) {
        return (
            <PanelHeader><h3 style={{display:'inline'}}>{issue.summary}</h3></PanelHeader>
        );
    },

    renderDetail: function(issue) {
        return (
            <div>
                {this.renderDetailHeader(issue)}

                <p>{issue.desc}</p>

                {issue.extras ? this.renderExtrasTable(extras) : ''}
            </div>
        );
    },

    renderDetailHeader: function(issue) {
        var urls = _.pluck(issue.urls, 'url');

        return (
            <h4>Find on {urls.join(', ')}</h4>
        );
    },

    renderExtrasTable: function(extras) {
        return <Table>
            <tbody>
            {extras.map(this.renderExtra)}
            </tbody>
        </Table>
    },

    renderExtra: function(extra, key) {
        return (
            <tr key={key}>
                <td className="c-report-issues-detail--extra">
                    {extra.title}
                    <br/>
                    <a href={extra.url} target="_blank">{extra.url}</a>
                </td>
            </tr>
        );
    }
});

module.exports = ReportIssuesDetail;
