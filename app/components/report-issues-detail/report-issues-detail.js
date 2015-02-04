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
            <Row>
                <Col xs={12}>
                    <Accordion>
                    {issues.map((issue, i) => {
                        return (
                            <Panel key={i} header={this.renderPanelHeader(issue)} eventKey={i + 1}>
                                {this.renderDetail(issue)}
                            </Panel>
                        );
                    })}
                    </Accordion>
                </Col>
            </Row>
        );
    },

    renderPanelHeader: function(issue) {
        return (
            <PanelHeader>{issue.summary}</PanelHeader>
        );
    },

    renderDetail: function(issue) {
        return (
            <div>
                {this.renderDetailHeader(issue)}

                <p>{issue.desc}</p>

                <Table>
                    <tbody>
                    {issue.extras.map(this.renderExtra)}
                    </tbody>
                </Table>
            </div>
        );
    },

    renderDetailHeader: function(issue) {
        var urls = _.pluck(issue.urls, 'url');

        return (
            <h3>Find on {urls.join(', ')}</h3>
        );
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
