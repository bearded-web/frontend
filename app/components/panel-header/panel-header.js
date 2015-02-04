var React = require('react');

var Fa = require('../fa');

var PanelHeader = React.createClass({
    render: function() {
        var link = this.props.children;

        return React.addons.cloneWithProps(link, {
            className: 'c-panel-header panel-title',
            children: (
                <span className="c-panel-header panel-title">
                    <span className="c-panel-header--down">
                        <Fa icon="chevron-down" fw />
                    </span>
                    <span className="c-panel-header--up">
                        <Fa icon="chevron-up" fw />
                    </span>
                    <span>
                        {link.props.children}
                    </span>
                </span>
            )
        });
    }
});

module.exports = PanelHeader;
