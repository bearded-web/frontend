/**
 * Widget
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import cn from 'classnames';

export default class Widget extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region render
    render() {
        const { children, type, style } = this.props;
        const classes = cn('widget', {
            'navy-bg': type === 'success',
            'red-bg': type === 'danger',
            'yellow-bg': type === 'warning',
            'lazur-bg': type === 'info'
        });

        return <div className={classes} style={style}>
            {children}
        </div>;
    }
    //endregion
}

Widget.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    style: PropTypes.object
};
Widget.defaultProps = {
    style: {}
};

