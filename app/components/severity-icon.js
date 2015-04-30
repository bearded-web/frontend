'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { icon, color, HIGH, MEDIUM, LOW } from '../lib/severities';
import { greenColor, orangeColor, redColor } from '../style';
import { assign } from 'lodash';

import Fa from './fa';

export default class SeverityIcon extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { size, severity, style } = this.props;

        if (!severity) return <span></span>;

        const iconStyle = {
            display: 'inline-block',
            textAlign: 'center',
            lineHeight: size + 'px',
            fontSize: size + 'px',
            color: color(severity)
        };

        assign(iconStyle, style);

        return <div style={iconStyle}>
            <Fa icon={icon(severity)} size="lg" fw/>
        </div>;
    }
}

SeverityIcon.propTypes = {
    severity: PropTypes.string.isRequired,
    size: PropTypes.number,
    style: PropTypes.object
};

SeverityIcon.defaultProps = {
    size: 30,
    style: {}
};

