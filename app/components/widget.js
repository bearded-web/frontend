var React = require('react');

var Widget = React.createClass({
    propTypes: {
        bg: React.PropTypes.oneOf(['navy', 'lazur', 'red', 'yellow'])
    },

    render: function() {
        var widgetClasses = {
            widget: true,
            'p-lg': true,
            'text-center': true
        };

        if (this.props.bg) widgetClasses[this.props.bg + '-bg'] = true;

        widgetClasses = React.addons.classSet(widgetClasses);

        return (
            <div className={widgetClasses}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Widget;
