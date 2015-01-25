var React = require('react');

var IboxTitle = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <div className="ibox-title">
                {this.props.children}
                <div className="ibox-tools">
                    <a className="collapse-link">
                        <i className="fa fa-chevron-up"></i>
                    </a>
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i className="fa fa-wrench"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <a href="#">Config option 1</a>
                        </li>
                        <li>
                            <a href="#">Config option 2</a>
                        </li>
                    </ul>
                    <a className="close-link">
                        <i className="fa fa-times"></i>
                    </a>
                </div>
            </div>
        );
    }
});

module.exports = IboxTitle;
