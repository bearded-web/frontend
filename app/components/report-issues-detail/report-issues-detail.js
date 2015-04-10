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
            <PanelHeader><h3 style={{display: 'inline'}}>{issue.summary}</h3></PanelHeader>
        );
    },

    renderDetail: function(issue) {
        return <div>
                {this.renderDetailHeader(issue)}
                <p>{issue.desc}</p>
                {issue.references ? this.renderReferencesTable(issue.references) : ''}
        </div>;
    },

    renderDetailHeader: function(issue) {
        if (!issue.vector || !issue.vector.url || issue.vector.url === "") {
            return "";
        } 

        return (
            <h4>Found on {issue.vector.url}</h4>
        );
    },

    renderReferencesTable: function(references) {
        return <Table>
            <tbody>
            {references.map(this.renderReference)}
            </tbody>
        </Table>;
    },

    renderReference: function(reference, key) {
        return (
            <tr key={key}>
                <td className="c-report-issues-detail--reference">
                    {reference.title}
                    <br/>
                    <a href={reference.url} target="_blank">{reference.url}</a>
                </td>
            </tr>
        );
    }
});

module.exports = ReportIssuesDetail;
