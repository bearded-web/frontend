'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { HIGH, MEDIUM, LOW } from '../lib/severities';
import { greenColor, grayColor, orangeColor, redColor } from '../style';
import { assign } from 'lodash';

export default class SeverityIcon extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { size, severity, style } = this.props;

        const iconStyle = {
            display: 'inline-block',
            height: size,
            width: size,
            borderRadius: size,
            overflow: 'hidden',
            textAlign: 'center',
            lineHeight: size + 'px',
            fontSize: size - 10 + 'px',
            color: '#FFF',
            textTransform: 'uppercase'
        };

        iconStyle.backgroundColor = {
            [HIGH]: redColor,
            [MEDIUM]: orangeColor,
            [LOW]: greenColor
        }[severity];

        assign(iconStyle, style);

        const letter = severity.charAt(0);

        return <div style={iconStyle}>
            {letter}
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

