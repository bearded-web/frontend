const React = require('react');

const Fa = require('../fa');

const PanelHeader = React.createClass({
    static: {
        propTypes: {
            children: React.PropTypes.node
        }
    },
    render: function() {
        var link = this.props.children;

        return React.addons.cloneWithProps(link, {
            className: 'c-panel-header panel-title',
            children: (
                <span className="c-panel-header panel-title">
                    <div className="c-panel-header--down">
                        <Fa icon="chevron-down" fw />
                    </div>
                    <div className="c-panel-header--up">
                        <Fa icon="chevron-up" fw />
                    </div>
                    <div className="c-panel-header--content">
                        {link.props.children}
                    </div>
                </span>
            )
        });
    }
});

module.exports = PanelHeader;
