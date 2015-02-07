var React = require('react');

var { Row, Col, Panel } = require('react-bootstrap');

var ReportTechs = React.createClass({
    propsTypes: {
        reports: React.PropTypes.array.isRequired
    },

    render: function() {
        var techs = this.getTechsFromReports(this.props.reports);

        if (!techs.length) {
            return <div></div>;
        }

        return (
            <div className="c-report-techs">
                <Panel header={iget('Techs')}>
                <Row>
                {techs.map(function(tech, i) {
                    return (
                        <Col xs={6} sm={4} md={3} key={i}>
                            <h3>{tech.name}</h3>
                            Version: {tech.version}
                            <br/>
                            Categories: {tech.categories.join(', ')}
                            <br/>
                            Confidence: {tech.confidence}%
                        </Col>
                    );
                })}
                </Row>
                </Panel>
            </div>
        );
    },

    getTechsFromReports: function(reports) {
        var result = [];

        reports.forEach((report) => {
            if (report.type === 'multi') {
                result.push.apply(result, this.getTechsFromReports(report.multi));

                return;
            }

            result.push.apply(result, report.techs);
        });

        return result;
    }
});

module.exports = ReportTechs;
