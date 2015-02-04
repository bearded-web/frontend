var React = require('react');

var { Row, Col } = require('react-bootstrap'),
    ReportIssuesTotal = require('../report-issues-total'),
    Fa = require('../fa');

var TargetStatus = React.createClass({
    render: function() {

        return (
            <div className="target-status">
                <Row>
                    <Col xs={12}>
                        <ReportIssuesTotal short severity="hi" count={3} />
                        <ReportIssuesTotal short severity="medium" count={1} />
                        <ReportIssuesTotal short severity="low" count={6} />
                    </Col>
                </Row>
            </div>
        );
    }
});

module.exports = TargetStatus;
//<ul className="list-unstyled">
//                 <li className="target-status--item target-status--hi">
//
//                     <span className="target-status--item-text">{iget('Hi level danger')}</span>
//                 </li>
//                 <li className="target-status--item target-status--medium">
//                     <Fa icon="exclamation-circle" size="2x" fw />
//                     <span className="target-status--item-text">{iget('Medium warnings')}</span>
//                 </li>
//                 <li className="target-status--item target-status--low">
//                     <Fa icon="eye" size="2x" fw />
//                     <span className="target-status--item-text">{iget('Low notify')}</span>
//                     Hi level danger
//                 </li>
//             </ul>
