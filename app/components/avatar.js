/**
 * User avatar
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { merge } from 'lodash';

export default class Avatar extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { avatar, size, style } = this.props;
        const imgStyle = merge({
            height: size,
            width: size,
            borderRadius: size
        }, style);

        return <img src={avatar} style={imgStyle}/>;
    }
}

Avatar.propTypes = {
    avatar: PropTypes.string.isRequired,
    size: PropTypes.number,
    style: PropTypes.object
};

Avatar.defaultProps = {
    size: 38,
    style: {}
};
