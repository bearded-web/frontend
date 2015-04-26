/**
 * SeverityWidget
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { icon, bsStyle, HIGH, LOW, MEDIUM } from '../lib/severities';

import Widget from './widget';
import Fa from './fa';

const S = {
    icon: {
        float: 'left'
    },
    count: {
        float: 'right',
        fontWeight: 'bold'
    }
};

export default class SeverityWidget extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region render
    render() {
        const { severity, count } = this.props;
        const style = {
            opacity: count ? 1 : 0.4,
            textAlign: 'center',
            fontSize: '30px'
        };
        const type = bsStyle(severity);

        return <Widget type={type} style={style}>
            <span style={S.count}>{count}</span>
            <span style={S.icon} className="severity-widget-icon">
                <Fa icon={icon(severity)} fw/>
            </span>
        </Widget>;
    }

    //endregion
}

SeverityWidget.propTypes = {
    severity: PropTypes.oneOf([HIGH, MEDIUM, LOW]).isRequired,
    count: PropTypes.number
};
SeverityWidget.defaultProps = {
    count: 0
};
