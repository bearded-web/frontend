'use strict';

import React, { PropTypes, addons } from 'react/addons';
import { State, Link } from 'react-router';
import classSet from 'classnames';

let { PureRenderMixin } = addons;

export default React.createClass({
    mixins: [
        PureRenderMixin
    ],

    contextTypes: {
        router: PropTypes.func
    },

    propTypes: {
        children: PropTypes.node,
        route: PropTypes.string.isRequired
    },

    render() {
        let { route, children } = this.props,
            cName = classSet({ active: this.context.router.isActive(route) });

        return <li className={cName}>
            <Link to={route}>
                {children}
            </Link>
        </li>;
    }
});

