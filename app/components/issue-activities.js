'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { List } from 'immutable';
import { bindAll, capitalize } from 'lodash';

import TimelineItem from './timeline-item';
import { Link } from 'react-router';

export default class IssueActivities extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'renderActivity'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { activities } = this.props;

        return <div>
            {activities.toArray().map(this.renderActivity)}

        </div>;
    }

    renderActivity(activity) {
        const { created, type, report } = activity.toObject();
        const scan = report && report.get('scan');

        return <TimelineItem icon="cog" date={created}>
            <p className="m-b-xs">
                <strong>{capitalize(type)}</strong>
            </p>

            {report && <p>
                <Link to="report" query={{scan}}>Go to report</Link>
            </p>}
        </TimelineItem>;
    }
}

IssueActivities.propTypes = {
    activities: PropTypes.instanceOf(List)
};

