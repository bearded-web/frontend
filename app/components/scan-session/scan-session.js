var React = require('react'),
    _ = require('lodash'),
    moment = require('moment');

var { ProgressBar, Tooltip, OverlayTrigger } = require('react-bootstrap'),
    Fa = require('../fa');


var ScanSession = React.createClass({
    propTypes: {
        session: React.PropTypes.object.isRequired
    },

    render: function() {
        var session = this.props.session,
            createdAt = moment(session.created),
            isEnded = _.contains(['finished', 'error'], session.status),
            progress,
            tooltip;

        if (isEnded) {
            progress = 100;
        } else {
            progress = moment().diff(createdAt, 'seconds');
            progress = Math.tanh(progress / 20);
            progress = Math.min(progress * 100 - 3, 100);
            progress = Math.max(progress, 0);
        }

        tooltip = (
            <Tooltip>{session.step.desc}</Tooltip>
        );

        return (
            <div className="c-scan-session">
                <OverlayTrigger placement="right" overlay={tooltip}>
                    <div>
                        <div className="c-scan-session--icon">
                            <Fa icon={isEnded ? 'check' : 'cog'} fw spin={!isEnded}/>
                        </div>
                        <div className="c-scan-session--info">
                            <span>{session.step.name}</span>
                            <ProgressBar now={progress} style={{ height: '5px' }}/>
                        </div>
                    </div>
                </OverlayTrigger>
            </div>
        );
    }
});

module.exports = ScanSession;
