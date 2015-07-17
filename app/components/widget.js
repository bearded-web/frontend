/**
 * Widget
 */

import { PropTypes, Component } from 'react/addons';
import cn from 'classnames';
import purify from '../lib/purify';

@purify
export default class Widget extends Component {
    static propTypes = {
        children: PropTypes.node,
        type: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string
    };
    static defaultProps = {
        style: {}
    };
    //region render
    render() {
        const { children, type, className, ...props } = this.props;
        const classes = cn('widget', 'clearfix', className, {
            'navy-bg': type === 'success',
            'red-bg': type === 'danger',
            'yellow-bg': type === 'warning',
            'lazur-bg': type === 'info'
        });

        return <div className={classes} {...props}>
            {children}
        </div>;
    }
    //endregion
}
