/**
 * User avatar
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { merge } from 'lodash';
import { gray } from '../style';

export default class Avatar extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { avatar, size, style } = this.props;
        const st = merge({
            display: 'inline-block',
            overflow: 'hidden',
            height: size,
            width: size,
            borderRadius: size
        }, style);
        const imgStyle = { width: size, height: size };

        if (!avatar) style.background = gray;

        return <span style={st}>
            <img src={avatar} style={imgStyle}/>
        </span>;
    }
}

Avatar.propTypes = {
    avatar: PropTypes.string,
    size: PropTypes.number,
    style: PropTypes.object
};

Avatar.defaultProps = {
    size: 38,
    style: {}
};
