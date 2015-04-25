'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { HIGH, MEDIUM, LOW } from '../lib/severities';
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
            height: size,
            width: size,
            borderRadius: size,
            textAlign: 'center',
            lineHeight: size + 'px',
            fontSize: size + 'px'
        };

        iconStyle.color = {
            [HIGH]: redColor,
            [MEDIUM]: orangeColor,
            [LOW]: greenColor
        }[severity];

        assign(iconStyle, style);

        const icon = {
            high: 'bomb',
            medium: 'exclamation-circle',
            low: 'eye'
        }[severity];

        return <div style={iconStyle}>
            <Fa icon={icon} size="lg"/>
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

