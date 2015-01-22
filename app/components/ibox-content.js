var React = require('react');

var IboxContent = React.createClass({
    propTypes: {
        children: React.PropTypes.renderable
    },

    render: function() {
        return (
            <div className="ibox-content">
                {this.props.children}
            </div>
        );
    }
});

module.exports = IboxContent;
