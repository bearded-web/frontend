module.exports = React.createClass({
    propTypes: {
        text: React.PropTypes.string.isRequired
    },

    render: function() {
        return (
            <div className="text-danger">
                {this.props.text}
            </div>
        );
    }
});
