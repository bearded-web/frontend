var React = require('react');

var { Row, Col } = require('react-bootstrap'),
    Widget = require('../widget'),
    Fa = require('../fa');

var TargetStatus = React.createClass({
    render: function() {
        var iconSize = '2x';

        return (
            <div className="target-status">
                <Row>
                    <Col xs={4}>
                        <Widget bg="red">
                            <Fa icon="bomb" size={iconSize} fw />
                            <h1>2</h1>
                            <h3 className="font-bold no-margins">Crit</h3>
                        </Widget>
                    </Col>
                    <Col xs={4}>
                        <Widget bg="yellow">
                            <Fa icon="exclamation-circle" size={iconSize} fw />
                            <h1>5</h1>
                            <h3 className="font-bold no-margins">Warn</h3>
                        </Widget>
                    </Col>
                    <Col xs={4}>
                        <Widget bg="lazur">
                            <Fa icon="eye" size={iconSize} fw />
                            <h1>7</h1>
                            <h3 className="font-bold no-margins">Info</h3>
                        </Widget>
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
