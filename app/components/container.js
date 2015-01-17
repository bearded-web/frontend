module.exports = React.createClass({
    render: function() {
        var cName = this.props.className + ' container';

        if (this.props.fluid) {
            cName += '-fluid'
        }

        return (
            <div className={cName}>
                {this.props.children}
            </div>
        );
    }
});
