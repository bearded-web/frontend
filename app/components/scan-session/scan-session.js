var React = require('react'),
    moment = require('moment');

var { ProgressBar, Tooltip, OverlayTrigger } = require('react-bootstrap');


var ScanSession = React.createClass({
    propTypes: {
        session: React.PropTypes.object.isRequired
    },

    render: function() {
        var session = this.props.session,
            createdAt = moment(session.created),
            progress = moment().diff(createdAt, 'seconds'),
            tooltip;

        progress = Math.tanh(progress / 20);
        progress = Math.min(progress * 100 - 3, 100);
        progress = Math.max(progress, 0);

        tooltip = (
            <Tooltip>{session.step.desc}</Tooltip>
        );

        return (
            <div className="c-scan-session">
                <OverlayTrigger placement="right" overlay={tooltip}>
                    <div>
                        <span>{session.step.name}</span>
                        <ProgressBar now={progress} style={{ height: '5px' }}/>
                    </div>
                </OverlayTrigger>
            </div>
        );
    }
});

module.exports = ScanSession;
