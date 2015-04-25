/**
 * SeverityWidget
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import Widget from './widget';
import Fa from './fa';

export default class SeverityWidget extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region render
    render() {
        const { severity, count } = this.props;
        const style = {
            opacity: count ? 1 : 0.4
        };
        const type = {
            high: 'danger',
            medium: 'warning',
            low: 'info'
        }[severity];
        const icon = {
            high: 'bomb',
            medium: 'exclamation-circle',
            low: 'eye'
        }[severity];
        const countStyle = { fontSize: '30px' };

        return <Widget type={type} style={style}>
            <div className="row vertical-align">
                <div className="col-xs-3">
                    <Fa icon={icon} size="3x"/>
                </div>
                <div className="col-xs-9 text-right">
                    <h2 className="font-bold" style={countStyle}>{count}</h2>
                </div>
            </div>
        </Widget>;
    }

    //endregion
}

SeverityWidget.propTypes = {
    severity: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
    count: PropTypes.number
};
SeverityWidget.defaultProps = {
    count: 0
};
