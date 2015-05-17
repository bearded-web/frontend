/**
 * SeverityWidget
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { icon, bsStyle, HIGH, LOW, MEDIUM, INFO } from '../lib/severities';

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
    static propTypes = {
        severity: PropTypes.oneOf([HIGH, MEDIUM, LOW, INFO]).isRequired,
        count: PropTypes.number
    };

    static defaultProps = {
        count: 0
    };

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
            <div className="m-b-md">
                <Fa icon={icon(severity)} size="lg"/>

                <h1>{count}</h1>

                <h3 className="font-bold no-margins">
                    {severity}
                </h3>
            </div>
        </Widget>;
    }

    //endregion
}
