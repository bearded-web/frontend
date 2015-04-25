'use strict';

import { Component, PropTypes } from 'react/addons';

export default class IboxTitle extends Component {
    render() {
        const { children, title } = this.props;
        const style = { display: 'none' };

        return <div className="ibox-title">
            {title && <h5>{title}</h5>}
            {children}
            <div className="ibox-tools" style={style}>
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
        </div>;
    }
}

IboxTitle.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
};
