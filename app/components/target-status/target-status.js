var React = require('react');

var Fa = require('../fa');

var TargetStatus = React.createClass({
    render: function() {
        return (
            <div className="target-status">
                <ul className="list-unstyled">
                    <li className="target-status--item target-status--hi">
                        <Fa icon="bomb" size="2x" fw />
                        <span className="target-status--item-text">{iget('Hi level danger')}</span>
                    </li>
                    <li className="target-status--item target-status--medium">
                        <Fa icon="exclamation-circle" size="2x" fw />
                        <span className="target-status--item-text">{iget('Medium warnings')}</span>
                    </li>
                    <li className="target-status--item target-status--low">
                        <Fa icon="eye" size="2x" fw />
                        <span className="target-status--item-text">{iget('Low notify')}</span>
                        Hi level danger
                    </li>
                </ul>
            </div>
        );
    }
});

module.exports = TargetStatus;
