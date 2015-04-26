'use strict';

import { Component, PropTypes } from 'react/addons';

import Fa from './fa';

export default class IboxTitle extends Component {
    onToggle(e) {
        e.preventDefault();

        if (this.props.onToggle) this.props.onToggle();
    }

    render() {
        const { children, title, expanded, onToggle, noControls } = this.props;
        const icon = expanded ? 'chevron-up' : 'chevron-down';

        return <div className="ibox-title">
            {title && <h5>{title}</h5>}
            {children}
            {noControls || <div className="ibox-tools">
                {onToggle && <a className="collapse-link" onClick={(e) => this.onToggle(e)}>
                    <Fa icon={icon}/>
                </a>}
            </div>}
        </div>;
    }
}

IboxTitle.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    expanded: PropTypes.bool,
    noControls: PropTypes.bool,
    onToggle: PropTypes.func
};
IboxTitle.defaultProps = {
    expanded: true,
    noControls: false
};
