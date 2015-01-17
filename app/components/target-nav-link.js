var Link = require('react-router').Link;

module.exports = React.createClass({
    render: function() {
        var target = this.props.target;

        return (
            <li key={target.id}>
                <Link to="target" params={{ targetId: target.id }} className="b-left-panel--target">
                    <span>
                        <i className="fa fa-crosshairs"></i>{target.domain}
                    </span>
                    <span className="label label-warning pull-right">
                        <i className="fa fa-exclamation"></i>
                    </span>
                </Link>
            </li>
        );
    }
});
