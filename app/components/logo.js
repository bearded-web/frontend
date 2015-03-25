'use strict';

import { PropTypes, addons, Component } from 'react/addons';
import logoSrc from '../images/barbudo_net_logo_vertical_green.png';

let style = {
    width: '100%'
};

export default class Logo extends Component {
    render() {
        return <img src={logoSrc} style={style}/>;
    }
}

Logo.mixins = [addons.PureRenderMixin];
Logo.propTypes = {};

