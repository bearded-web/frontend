var React = require('react');

var Ibox = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <div className="ibox">
                {this.props.children}
            </div>
        );
    }
});

module.exports = Ibox;
