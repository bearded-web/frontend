'use strict';

/**
 * Visual timeline component from inspinia
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import moment from 'moment';
import Fa from './fa';

export default class TimelineItem extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { date, icon, children } = this.props;

        const formattedDate = moment(date).calendar();

        return <div className="row timeline-item">
            <div className="col-xs-3 date">
                <Fa icon={icon}/>
                <i className="fa fa-briefcase"></i>
                {formattedDate}
                <br/>
            </div>
            <div className="col-xs-7 content no-top-border">
                {children}
            </div>
        </div>;
    }
}

TimelineItem.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.string,
    date: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
    ])
};

