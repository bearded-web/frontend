"use strict";

import React, { PropTypes, addons } from 'react/addons';
import { State, Link } from 'react-router';

let { PureRenderMixin, classSet } = addons;

export default React.createClass({
    mixins: [
        PureRenderMixin,
        State
    ],

    propTypes: {
        children: PropTypes.node,
        route: PropTypes.string.isRequired
    },

    render() {
        let { route, children } = this.props,
            cName = classSet({ active: this.isActive(route) });

        return <li className={cName}>
            <Link to={route}>
                {children}
            </Link>
        </li>
    }
});

