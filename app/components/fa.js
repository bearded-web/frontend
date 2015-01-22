var React = require('react');

var Fa = React.createClass({
    propTypes: {
        icon: React.PropTypes.string.isRequired,
        size: React.PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x'])
    },

    render: function() {
        var cls = { fa: true };

        cls['fa-' + this.props.icon] = true;

        if (this.props.size) cls['fa-' + this.props.size] = true;

        return (
            <i className={React.addons.classSet(cls)}></i>
        );
    }
});

module.exports = Fa;
