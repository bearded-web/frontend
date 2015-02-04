var React = require('react'),
    { PropTypes } = React;

var Widget = React.createClass({
    propTypes: {
        bg: PropTypes.oneOf(['navy', 'lazur', 'red', 'yellow']),
        hover: PropTypes.bool
    },

    render: function() {
        var props = this.props,
            widgetClasses = {
                'c-widget': true,
                'p-lg': true,
                'text-center': true,
                'c-widget--hover': props.hover
            };

        if (props.bg) widgetClasses[props.bg + '-bg'] = true;

        widgetClasses = React.addons.classSet(widgetClasses);

        return (
            <div className={widgetClasses} style={props.style}>
                {props.children}
            </div>
        );
    }
});

module.exports = Widget;
