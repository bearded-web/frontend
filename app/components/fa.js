'use strict';

import { PropTypes, Component } from 'react/addons';
import cNames from 'classnames';

export default class Fa2 extends Component {
    render() {
        var props = this.props,
            style = {
                verticalAlign: this.props.align || 'inherit'
            },
            cls = {
                fa: true,
                'fa-spin': props.spin,
                'fa-fw': props.fw
            };

        cls['fa-' + props.icon] = true;

        if (props.size) cls['fa-' + props.size] = true;
        if (props.flip) cls['fa-flip-' + props.flip] = true;


        return (
            <i className={cNames(cls)} style={style}></i>
        );
    }
}

Fa2.propTypes = {
    icon: PropTypes.string.isRequired,
    fw: PropTypes.bool,
    spin: PropTypes.bool,
    flip: PropTypes.string,
    align: PropTypes.string,
    size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x'])
};


